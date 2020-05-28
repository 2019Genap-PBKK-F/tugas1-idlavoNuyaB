import DashView from './components/Dash.vue'
import NotFoundView from './components/404.vue'
import LoginView from './components/Login.vue'

// Import Views - Dash
import DDUView from './components/views/DataDasar.vue'
import AView from './components/views/Aspek.vue'
import CUView from './components/views/CapaianUnit.vue'
import IPView from './components/views/IndikatorPeriode.vue'
import PView from './components/views/Periode.vue'
import MIView from './components/views/MasterIndikator.vue'
import SKView from './components/views/SatuanKerja.vue'
import ISView from './components/views/IndikatorSatker.vue'
import ISLView from './components/views/IndikatorSatkerLog.vue'
import JSView from './components/views/JenisSatker.vue'
import DView from './components/views/Dosen.vue'
import AbView from './components/views/Abmas.vue'
import PeView from './components/views/Penelitian.vue'
import PuView from './components/views/Publikasi.vue'
import Kview from './components/views/Konkin.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/',
    component: DashView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dosen',
        alias: 'd',
        component: DView,
        name: 'Dosen'
      }, {
        path: 'abmas',
        alias: 'ab',
        component: AbView,
        name: 'Abmas'
      }, {
        path: 'penelitian',
        alias: 'pe',
        component: PeView,
        name: 'Penelitian'
      }, {
        path: 'publikasi',
        alias: 'pu',
        component: PuView,
        name: 'publikasi'
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
      }, {
        path: 'indikatorperiode',
        alias: 'ip',
        component: IPView,
        name: 'Indikator Periode',
        meta: {description: 'Indikator Periode??'}
      }, {
        path: 'periode',
        alias: 'p',
        component: PView,
        name: 'Periode',
        meta: {description: 'Periode??'}
      }, {
        path: 'indikatorsatker',
        alias: 'is',
        component: ISView,
        name: 'Indikator Satuan Kerja',
        meta: {description: 'Apa yang telah dicapai??'}
      }, {
        path: 'indikatorsatkerlog',
        alias: 'isl',
        component: ISLView,
        name: 'Indikator Satuan Kerja Log',
        meta: {description: 'Apa yang telah dicapai??'}
      }, {
        path: 'jenissatker',
        alias: 'js',
        component: JSView,
        name: 'Jenis Satuan Kerja',
        meta: {description: 'Apa yang telah dicapai??'}
      }, {
        path: 'masterindikator',
        alias: 'mi',
        component: MIView,
        name: 'Master Indikator',
        meta: {description: 'Apa yang telah dicapai??'}
      }, {
        path: 'satker',
        alias: 'sk',
        component: SKView,
        name: 'Satuan Kerja',
        meta: {description: 'Apa yang telah dicapai??'}
      }, {
        path: 'aspek',
        alias: 'a',
        component: AView,
        name: 'Aspek',
        meta: {description: 'Apa yang telah dicapai??'}
      }, {
        path: 'konkin',
        alias: '',
        component: Kview,
        name: 'Konkin',
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
