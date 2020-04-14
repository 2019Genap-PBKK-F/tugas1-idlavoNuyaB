import DashView from './components/Dash.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import KUView from './components/views/KategoriUnit.vue'
import UView from './components/views/Unit.vue'
import DDUView from './components/views/DataDasar.vue'
import CUView from './components/views/CapaianUnit.vue'

// Routes
const routes = [
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'kategoriunit',
        alias: '',
        component: KUView,
        name: 'Kategori Unit',
        meta: {description: 'Ini buat apa??'}
      }, {
        path: 'unit',
        component: UView,
        name: 'Unit',
        meta: {description: 'Unit dibeli'}
      }, {
        path: 'datadasar',
        alias: 'dd',
        component: DDUView,
        name: 'Data Dasar',
        meta: {description: 'Datanya dasarannya seperti apa?'}
      }, {
        path: 'capaianunit',
        alias: 'cu',
        component: CUView,
        name: 'Capaian Unit',
        meta: {description: 'Apa yang telah dicapai??'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
