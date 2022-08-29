
import {
  Template,
  Catalog,
  NetworkEnterprise,
  Partnership,
  CurrencyBaht,
  Book,
  IbmZOsPackageManager,
  TwoPersonLift,
  TaskTools,
  CarbonForIbmDotcom
} from '@carbon/react/icons'
export default [
  {
    id: '1',
    title: '工作台',
    icon: Template,
    children: null,
    url: '/',
  },
  {
    id: '2',
    title: '工作日程',
    icon: Catalog,
    level: 2,
    children: [
      {
        id: '2-1',
        title: '会议预定',
        icon: null,
        children: [
          { id: '2-1-1', title: '我的会议', children: null, icon: null, url: '' },
          { id: '2-1-2', title: '会议室管理', children: null, icon: null, url: '' }
        ]
      },
      {
        id: '2-2',
        title: '项目进程',
        icon: null,
        children: [
          { id: '2-2-1', title: '任务工作台', children: null, url: '', icon: null },
          { id: '2-2-2', title: '项目', children: null, url: '', icon: null },
          { id: '2-2-3', title: '项目模版', children: null, url: '', icon: null },
          { id: '2-2-4', title: '项目统计', children: null, url: '', icon: null }
        ]
      },
      {
        id: '2-3', title: '工作日志',
        icon: null,
        children: [
          { id: '2-3-1', title: '日志录入', children: null, url: '' },
          { id: '2-3-2', title: '业务团队日志', children: null, url: '' },
          { id: '2-3-3', title: '日志管理', children: null, url: '' },
          { id: '2-3-4', title: '我的日志', children: null, url: '' },
          { id: '2-3-5', title: '日志审批', children: null, url: '' },
          { id: '2-3-6', title: '日志统计', children: null, url: '' }

        ]
      },
      {
        id: '2-4', title: '工作日程',
        icon: null,
        children: [
          { id: '2-4-1', title: '我的日程', children: null, url: '' },
          { id: '2-4-2', title: '开庭信息', children: null, url: '' },
          { id: '2-4-3', title: '日程中心', children: null, url: '' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: '业务管理',
    icon: NetworkEnterprise,
    level: 2,
    children: [
      {
        id: '3-1',
        title: '案件管理',
        icon: null,
        children: [
          { id: '3-1-1', title: '我的案件', url: '/dashboard', children: null, icon: null, },
          { id: '3-1-2', title: '我的进程', url: '', children: null, icon: null, },
          { id: '3-1-3', title: '案件管理', url: '', children: null, icon: null, },
          { id: '3-1-4', title: '案件登记', url: '', children: null, icon: null, },
          { id: '3-1-5', title: '案件分析', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '3-2',
        title: '立案管理',
        icon: null,
        children: [
          { id: '3-2-1', title: '利益冲突预检', url: '', children: null, icon: null, },
          { id: '3-2-2', title: '立案申请', url: '', children: null, icon: null, },
          { id: '3-2-3', title: '我的立案', url: '', children: null, icon: null, },
          { id: '3-2-4', title: '案件审批', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '3-3',
        title: '文书管理',
        icon: null,
        children: [
          { id: '3-3-1', title: '我的文书', url: '', children: null, icon: null, },
          { id: '3-3-2', title: '文书审核', url: '', children: null, icon: null, },
          { id: '3-3-3', title: '盖章审核', url: '', children: null, icon: null, },
          { id: '3-3-4', title: '文件模板', url: '', children: null, icon: null, },
          { id: '3-3-5', title: '案件文书管理', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '3-4',
        title: '结案管理',
        icon: null,
        children: [
          { id: '3-4-1', title: '结案申请', url: '', children: null },
          { id: '3-4-2', title: '我的结案', url: '', children: null },
          { id: '3-4-3', title: '结案审核', url: '', children: null },
          { id: '3-4-4', title: '档案管理', url: '', children: null },
          { id: '3-4-5', title: '结案保证金', url: '', children: null }
        ]
      },
      {
        id: '3-5',
        title: '业绩案例库',
        icon: null,
        children: [
          { id: '3-5-1', title: '业绩案例查询', url: '', children: null },
          { id: '3-5-2', title: '业绩案例申报', url: '', children: null },
          { id: '3-5-3', title: '业绩案例管理', url: '', children: null }
        ]
      }
    ]
  },
  {
    id: '4',
    title: '客户关系',
    icon: Partnership,
    level: 2,
    children: [
      {
        id: '4-1',
        title: '客户管理',
        icon: null,
        children: [
          { id: '4-1-1', title: '增加客户', url: '', children: null, icon: null, },
          { id: '4-1-2', title: '我的客户', url: '', children: null, icon: null, },
          { id: '4-1-3', title: '客户拜访记录', url: '', children: null, icon: null, },
          { id: '4-1-4', title: '客户通讯录', url: '', children: null, icon: null, },
          { id: '4-1-5', title: '客户管理', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '4-2',
        title: '客户线索',
        icon: null,
        children: [
          { id: '4-2-1', title: '我的线索', url: '', children: null },
          { id: '4-2-2', title: '线索审核', url: '', children: null },
          { id: '4-2-3', title: '线索管理', url: '', children: null }
        ]
      },
      {
        id: '4-3',
        title: '客户入库',
        icon: null,
        children: [
          { id: '4-3-1', title: '入库申报', url: '', children: null },
          { id: '4-3-2', title: '我的入库', url: '', children: null },
          { id: '4-3-3', title: '入库审核', url: '', children: null },
          { id: '4-3-4', title: '入库管理', url: '', children: null }
        ]
      }
    ]
  },
  {
    id: '5',
    title: '文档中心',
    icon: Book,
    level: 2,
    children: [
      { id: '5-1', title: '文档中心 ', url: '', children: null }
    ]
  },

  {
    id: '6',
    title: '财务管理',
    icon: CurrencyBaht,
    level: 2,
    children: [
      {
        id: '6-1',
        title: '合同管理',
        children: [
          { id: '6-1-1', title: '我的合同', children: null },
          { id: '6-1-2', title: '合同管理', children: null }
        ]
      },
      {
        id: '6-2',
        title: '账单管理',
        icon: null,
        children: [
          { id: '6-2-1', title: '账单录入', children: null, url: '', icon: null, },
          { id: '6-2-2', title: '我的账单', children: null, url: '', icon: null, },
          { id: '6-2-3', title: '账单模板', children: null, url: '', icon: null, },
          { id: '6-2-4', title: '账单审核', children: null, url: '', icon: null, },
          { id: '6-2-5', title: '账单管理', children: null, url: '', icon: null, }
        ]
      },
      {
        id: '6-3',
        title: '发票管理',
        icon: null,
        children: [
          { id: '6-3-1', title: '发票登记', children: null, url: '', icon: null, },
          { id: '6-3-2', title: '发票申请', children: null, url: '', icon: null, },
          { id: '6-3-3', title: '我的发票', children: null, url: '', icon: null, },
          { id: '6-3-4', title: '发票审核', children: null, url: '', icon: null, },
          { id: '6-3-5', title: '发票管理', children: null, url: '', icon: null, },
          { id: '6-3-6', title: '电子发票录入', children: null, url: '', icon: null, },
          { id: '6-3-7', title: '我的电子发票', children: null, url: '', icon: null, },
          { id: '6-3-8', title: '电子发票管理', children: null, url: '', icon: null, }

        ]
      },
      {
        id: '6-4', title: '收款管理',
        icon: null,
        children: [
          { id: '6-4-1', title: '收款登记', children: null, url: '', icon: null, },
          { id: '6-4-2', title: '我的收款', children: null, url: '', icon: null, },
          { id: '6-4-3', title: '收款认领', children: null, url: '', icon: null, },
          { id: '6-4-4', title: '应收款列表', children: null, url: '', icon: null, },
          { id: '6-4-5', title: '收款审核', children: null, url: '', icon: null, },
          { id: '6-4-6', title: '收款管理', children: null, url: '', icon: null, }
        ]
      },
      {
        id: '6-5', title: '费用管理',
        icon: null,
        children: [
          { id: '6-5-1', title: '费用报销', children: null, url: '', icon: null, },
          { id: '6-5-2', title: '我的费用', children: null, url: '', icon: null, },
          { id: '6-5-3', title: '费用审核', children: null, url: '', icon: null, },
          { id: '6-5-4', title: '费用管理', children: null, url: '', icon: null, }
        ]
      },
      {
        id: '6-6', title: '分配管理',
        icon: null,
        children: [
          { id: '6-6-1', title: '我的分配', children: null, url: '', icon: null, },
          { id: '6-6-2', title: '我的创收', children: null, url: '', icon: null, },
          { id: '6-6-3', title: '分配管理', children: null, url: '', icon: null, },
          { id: '6-6-4', title: '分配设置', children: null, url: '', icon: null, },
          { id: '6-6-5', title: '创收统计', children: null, url: '', icon: null, }
        ]
      },
      {
        id: '6-7', title: '台账管理',
        icon: null,
        children: [
          { id: '6-7-1', title: '我的台账', children: null, url: '', icon: null, },
          { id: '6-7-2', title: '台账管理', children: null, url: '', icon: null, },
          { id: '6-7-3', title: '台账设置', children: null, url: '', icon: null, },
          { id: '6-7-4', title: '成本管理', children: null, url: '', icon: null, }
        ]
      },
      {
        id: '6-8', title: '运营成本',
        icon: null,
        children: [
          { id: '6-8-1', title: '我的支出', children: null, url: '', icon: null, },
          { id: '6-8-2', title: '支出管理', children: null, url: '', icon: null, }
        ]
      }
    ]
  },

  {
    id: '7',
    title: '行政管理',
    icon: IbmZOsPackageManager,
    level: 2,
    children: [
      {
        id: '7-1',
        title: '内网管理',
        icon: null,
        children: [
          { id: '7-1-1', title: '内网信息', url: '', children: null, icon: null, },
          { id: '7-1-2', title: '内网管理', url: '', children: null, icon: null, },
          { id: '7-1-3', title: '分类管理', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '7-2',
        title: '行政用章管理',
        icon: null,
        children: [
          { id: '7-2-1', title: '行政用章申请', url: '', children: null, icon: null, },
          { id: '7-2-2', title: '我的行政用章', url: '', children: null, icon: null, },
          { id: '7-2-3', title: '行政用章审核', url: '', children: null, icon: null, },
          { id: '7-2-4', title: '行政用章管理', url: '', children: null, icon: null, }
        ]
      }
    ]
  },


  {
    id: '8',
    title: '人力资源',
    icon: TwoPersonLift,
    level: 2,
    children: [
      {
        id: '8-1',
        title: '入职管理',
        icon: null,
        children: [
          { id: '8-1-1', title: '人员管理', url: '', children: null, icon: null, },
          { id: '8-1-2', title: '劳动关系管理', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '8-2',
        title: '请假管理',
        icon: null,
        children: [
          { id: '8-2-1', title: '我的请假', url: '', children: null, icon: null, },
          { id: '8-2-2', title: '请假审核', url: '', children: null, icon: null, },
          { id: '8-2-3', title: '请假管理', url: '', children: null, icon: null, },
          { id: '8-2-4', title: '年假设置', url: '', children: null, icon: null, },
          { id: '8-2-5', title: '考勤统计', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '8-3',
        title: '组织机构',
        icon: null,
        children: [
          { id: '8-3-1', title: '律所信息', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '8-4',
        title: '出差与外出',
        icon: null,
        children: [
          { id: '8-4-1', title: '出差与外出申请', url: '', children: null, icon: null, },
          { id: '8-4-2', title: '外出或出差审核', url: '', children: null, icon: null, },
          { id: '8-4-3', title: '出差与外出管理', url: '', children: null, icon: null, }
        ]
      },
      {
        id: '8-5',
        title: '出勤管理',
        icon: null,
        children: [
          { id: '8-5-1', title: '我的申诉', url: '', children: null, icon: null, },
          { id: '8-5-2', title: '申诉审核', url: '', children: null, icon: null, },
          { id: '8-5-3', title: '申诉管理', url: '', children: null, icon: null, },
          { id: '8-5-4', title: '出勤规则', url: '', children: null, icon: null, },
          { id: '8-5-5', title: '出勤统计', url: '', children: null, icon: null, }
        ]
      }
    ]
  },

  {
    id: '9',
    title: '常用工具',
    icon: TaskTools,
    level: 2,
    children: [
      { id: '9-1', title: '全时网络会议', url: '', children: null, icon: null, },
      { id: '9-2', title: '通讯录', url: '', children: null, icon: null, },
      { id: '9-3', title: '法天使合同库', url: '', children: null, icon: null, },
      { id: '9-4', title: '企业信息查询', url: '', children: null, icon: null, },
      { id: '9-5', title: '法律人导航', url: '', children: null, icon: null, },
      { id: '9-6', title: '威科·先行法律信息库', url: '', children: null, icon: null, }
    ]
  },
  {
    id: '10',
    title: '系统管理',
    icon: CarbonForIbmDotcom,
    level: 2,
    children: [
      { id: '10-1', title: '语言列表', url: '', children: null, icon: null, },
      { id: '10-2', title: '审计日志', url: '', children: null, icon: null, },
      { id: '10-3', title: '数据字典', url: '', children: null, icon: null, },
      { id: '10-4', title: '用户', url: '', children: null, icon: null, },
      { id: '10-5', title: '角色', url: '', children: null, icon: null, },
      { id: '10-6', title: '组织机构 ', url: '', children: null, icon: null, },
      { id: '10-7', title: '工作流', url: '', children: null, icon: null, },
      { id: '10-8', title: '设置', url: '', children: null, icon: null, },
      { id: '10-9', title: '第三方设置', url: '', children: null, icon: null, },
      { id: '10-10', title: '文档设置', url: '', children: null, icon: null, },
      { id: '10-11', title: '流水号编码规则', url: '', children: null, icon: null, },
      { id: '10-12', title: '系统布局', url: '/administration/layoutbuilder', children: null, icon: null, }
    ]
  }
]
