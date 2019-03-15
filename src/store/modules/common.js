const state = {
  // 面包屑
  bread: '销售报表',
  // 导航
  activeLi: 'staffSaleStatist',
  // tabsUl导航
  activeTab: 'staffSaleStatist',
  // 区域option
  regionOptions: []
}

const getters = {}

const mutations = {
  setBread (state, bread) {
    // 变更状态
    state.bread = bread
  },
  setActiveLi (state, activeLi) {
    // 变更状态
    state.activeLi = activeLi
  },
  setActiveTab (state, activeTab) {
    // 变更状态
    state.activeTab = activeTab
  },
  setRegionOptions (state, regionOptions) {
    state.regionOptions = regionOptions
  }
}

export default {
  common: {
    namespaced: true,
    state,
    getters,
    mutations
  }
}

