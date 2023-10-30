import { createRouter, createWebHistory } from 'vue-router'
import StudentListView from '../views/StudentListView.vue'
import StudentLayoutView from '../views/details/StudentLayoutView.vue'
import StudentDetailView from '../views/details/StudentDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import StudentService from '@/services/StudentService'
import { useStudentStore } from '@/stores/student'
import AdvisorListView from '../views/AdvisorListView.vue'
import AdvisorLayoutView from '../views/details/AdvisorLayoutView.vue'
import { useAdvisorStore } from '@/stores/advisor'
import AdvisorService from '@/services/AdvisorService'
import AdvisorDetailView from '@/views/details/AdvisorDetailView.vue'
import AddAdvisor from '@/components/AddAdvisor.vue'
import AdviseeListView from '@/views/AdviseeListView.vue'
import AdviseeLayoutView from '@/views/details/AdviseeLayoutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AnnouncePage from '@/views/AnnouncePageView.vue'
import StudentProfileView from '@/views/StudentProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import AdvisorProfileView from '@/views/AdvisorProfileView.vue'
import AboutView from '@/views/AboutView.vue'
import EditAdvisorProfileView from '@/views/EditAdvisorProfileView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'student-list',
      component: StudentListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      path: '/student/:id',
      name: 'student-layout',
      component: StudentLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        const advisorStore = useAdvisorStore()
        StudentService.getStudentById(id)
          .then((response) => {
            studentStore.setStudent(response.data)
            AdvisorService.getAdvisorById(Number(response.data.advisorId))
              .then((response) => {
                advisorStore.setAdvisor(response.data)
              })
              .catch((error) => {
                console.log(error)
                if (error.response && error.response.status === 404) {
                  return { name: '404-resource', params: { resource: 'id' } }
                }
              })
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              return { name: '404-resource', params: { resource: 'id' } }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
        },
        {
          path: 'advisor',
          name: 'advisor-detail-student',
          component: AdvisorDetailView,
          props: true
        },
      ]
    },
    //advisor
    {
      path: '/advisor',
      name: 'advisor-list',
      component: AdvisorListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      children:[
        {
          path: '/advisor-register',
          name: 'advisor-register',
          component: AddAdvisor
        },
      ]
    },
    {
      path: '/advisor/:id',
      name: 'advisor-layout',
      component: AdvisorLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const advisorStore = useAdvisorStore()
        return AdvisorService.getAdvisorById(id)
          .then((response) => {
            advisorStore.setAdvisor(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'advisor' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: 'advisor-detail',
          name: 'advisor-detail',
          component: AdvisorDetailView,
          props: true
        },
        
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/advisee',
      name: 'advisee-list',
      component: AdviseeListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    // {
    //   path: '/advisee/:id',
    //   name: 'advisee-layout',
    //   component: AdviseeLayoutView,
    //   props: true,
    //   beforeEnter: (to) => {
    //     const id: number = parseInt(to.params.id as string)
    //     const studentStore = useStudentStore()
    //     const advisorStore = useAdvisorStore()
    //     StudentService.getStudentById(id)
    //       .then((response) => {
    //         studentStore.setStudent(response.data)
    //         AdvisorService.getAdvisorById(Number(response.data.advisorId))
    //           .then((response) => {
    //             advisorStore.setAdvisor(response.data)
    //           })
    //           .catch((error) => {
    //             console.log(error)
    //             if (error.response && error.response.status === 404) {
    //               return { name: '404-resource', params: { resource: 'id' } }
    //             }
    //           })
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //         if (error.response && error.response.status === 404) {
    //           return { name: '404-resource', params: { resource: 'id' } }
    //         }
    //       })
    //   },
    //   children: [
    //     {
    //       path: '',
    //       name: 'student-detail',
    //       component: StudentDetailView,
    //       props: true
    //     },
    //     {
    //       path: 'advisor',
    //       name: 'advisor-detail-student',
    //       component: AdvisorDetailView,
    //       props: true
    //     },
    //   ]
    // },
    {
      path: '/announcement',
      name: 'announcement',
      component: AnnouncePage
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/student-profile',
      name: 'student-profile',
      component: StudentProfileView
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: EditProfileView
    },
    {
      path: '/advisor-profile',
      name: 'advisor-profile',
      component: AdvisorProfileView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
      
    },
    {
      path: '/editadvisor',
      name: 'editadvisor',
      component: EditAdvisorProfileView

    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
