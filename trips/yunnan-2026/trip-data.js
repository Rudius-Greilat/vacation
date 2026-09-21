export const routeStops = [
  { city: '南昌', date: '10.01', note: '晚间出发', icon: 'ri-flight-takeoff-line', color: 'bg-[#E8D4BE]' },
  { city: '昆明', date: '10.01—10.04', note: '住 3 晚', icon: 'ri-sun-cloudy-line', color: 'bg-[#DCE9D4]' },
  { city: '丽江', date: '10.04—10.06', note: '住 2 晚', icon: 'ri-landscape-line', color: 'bg-[#D6E3EA]' },
  { city: '长沙 → 九江', date: '10.06—10.07', note: '住 1 晚', icon: 'ri-train-line', color: 'bg-[#E6DCEB]' }
];

export const days = [
  {
    date: '10.01', week: '周四', city: '南昌 → 昆明', label: '落地就休息', theme: 'bg-[#E8D4BE]', image: './images/6bb84b297ae78632.jpg',
    summary: '今晚没有任务，安全抵达就是今天最好的完成。',
    schedule: [
      { time: '晚间', title: '从南昌出发', desc: '提前到达机场，办理值机后找个安静的位置休息。', icon: 'ri-flight-takeoff-line' },
      { time: '22:20', title: '抵达昆明', desc: '取行李后直接打车前往酒店，不安排夜间景点。', icon: 'ri-flight-land-line' },
      { time: '23:30', title: '入住休息', desc: '如果饿了就在酒店附近简单吃一点，早点睡。', icon: 'ri-hotel-bed-line' }
    ],
    food: ['便利店补给', '清淡宵夜'], stay: '翠湖 / 东风广场 / 昆明老街附近', energy: 20, note: '预留40—60分钟用于取行李和叫车。'
  },
  {
    date: '10.02', week: '周五', city: '昆明', label: '翠湖慢生活', theme: 'bg-[#DCE9D4]', image: './images/bb6f3c6522f271d9.jpg',
    summary: '从一碗米线开始，在翠湖边把脚步慢下来。',
    schedule: [
      { time: '09:30', title: '睡醒再出门', desc: '找一家附近的米线店，慢慢吃早餐。', icon: 'ri-bowl-line' },
      { time: '10:30', title: '翠湖公园', desc: '沿湖散步，看树影和水面，不给自己规定打卡数量。', icon: 'ri-leaf-line' },
      { time: '13:30', title: '讲武堂与文林街', desc: '选感兴趣的展览看看，再去文林街喝咖啡。', icon: 'ri-cup-line' },
      { time: '17:00', title: '昆明老街', desc: '逛老建筑与小店，走到金马碧鸡坊看亮灯。', icon: 'ri-building-4-line' }
    ],
    food: ['过桥米线', '野生菌火锅', '鲜花饼'], stay: '昆明原酒店', energy: 45, note: '所有景点都在市区，累了随时打车回酒店。'
  },
  {
    date: '10.03', week: '周六', city: '昆明', label: '滇池吹风', theme: 'bg-[#D9E6ED]', image: './images/0c5d8a61d10321f1.jpg',
    summary: '把大半天交给滇池，日落前不必有明确目的地。',
    schedule: [
      { time: '09:30', title: '悠闲早餐', desc: '避开早高峰后再前往海埂公园。', icon: 'ri-sun-line' },
      { time: '11:00', title: '海埂公园', desc: '沿滇池散步，找长椅坐一会儿，感受湖风。', icon: 'ri-water-flash-line' },
      { time: '14:00', title: '弹性下午', desc: '索道排队少就去西山；超过45分钟就改为湖边咖啡。', icon: 'ri-timer-line' },
      { time: '18:00', title: '看完日落返程', desc: '晚餐回市区解决，不在景区高峰时段赶路。', icon: 'ri-sunset-line' }
    ],
    food: ['汽锅鸡', '云南烧豆腐', '手冲咖啡'], stay: '昆明原酒店', energy: 40, note: '10月通常不是红嘴鸥旺季，不专门追海鸥。'
  },
  {
    date: '10.04', week: '周日', city: '昆明 → 丽江', label: '坐着看风景', theme: 'bg-[#EADFCF]', image: './images/22f399cd550f5012.jpg',
    summary: '换城日只做一件事：舒服地抵达丽江。',
    schedule: [
      { time: '08:00', title: '早餐与退房', desc: '不用赶最早班，给早餐和交通留足时间。', icon: 'ri-suitcase-line' },
      { time: '09:00—10:30', title: '动车前往丽江', desc: '优先选择昆明站出发的直达车，车程约3.5—4小时。', icon: 'ri-train-line' },
      { time: '14:30', title: '入住午休', desc: '酒店选古城外围、靠近车行道的位置。', icon: 'ri-hotel-line' },
      { time: '16:30', title: '古城随走', desc: '忠义市场、四方街自由散步，避开拥挤主街。', icon: 'ri-footprint-line' }
    ],
    food: ['纳西烤肉', '腊排骨', '鸡豆凉粉'], stay: '丽江古城北门 / 南门外围', energy: 35, note: '第一晚少饮酒、多喝水，让身体适应约2400米海拔。'
  },
  {
    date: '10.05', week: '周一', city: '丽江', label: '雪山与蓝湖', theme: 'bg-[#D6E3EA]', image: './images/8c4542e69e249b99.jpg',
    summary: '今天是风景高光，但路线依然选择体力友好版。',
    schedule: [
      { time: '07:00', title: '出发去雪山', desc: '早餐吃饱，携带保暖外套、防晒和水。', icon: 'ri-bus-line' },
      { time: '09:30', title: '云杉坪', desc: '索道加栈道轻松游览，不强求冰川公园最高点。', icon: 'ri-landscape-line' },
      { time: '12:30', title: '蓝月谷', desc: '避开最拥挤机位，沿湖慢走，按体力决定停留时长。', icon: 'ri-water-flash-line' },
      { time: '16:00', title: '返回古城', desc: '晚上不再安排景点，吃饭、泡脚、早点休息。', icon: 'ri-moon-clear-line' }
    ],
    food: ['牦牛肉火锅', '热姜茶', '青稞饼'], stay: '丽江原酒店', energy: 65, note: '若明显头痛、恶心或胸闷，停止上升并及时下撤。'
  },
  {
    date: '10.06', week: '周二', city: '丽江 → 长沙', label: '古镇发呆', theme: 'bg-[#E5DEEC]', image: './images/9d55ed90cbd7c2ff.jpg',
    summary: '离开前再看一次雪山，把白天留给安静的白沙。',
    schedule: [
      { time: '09:30', title: '退房寄存', desc: '轻装前往白沙古镇，找得到雪山的街角。', icon: 'ri-luggage-deposit-line' },
      { time: '11:00', title: '白沙古镇', desc: '逛小店、看壁画、喝咖啡，不赶去过多古镇。', icon: 'ri-store-2-line' },
      { time: '16:30', title: '取行李去机场', desc: '最迟17:30从古城出发，给国庆交通留足缓冲。', icon: 'ri-taxi-line' },
      { time: '21:00—23:15', title: '飞往长沙', desc: '抵达后直接入住五一广场或芙蓉广场附近。', icon: 'ri-flight-takeoff-line' }
    ],
    food: ['白沙馒头', '纳西家常菜', '机场简餐'], stay: '长沙五一广场 / 芙蓉广场', energy: 45, note: '束河古镇只是备选，不为了多去一个地方而赶路。'
  },
  {
    date: '10.07', week: '周三', city: '长沙 → 九江', label: '一碗粉再回家', theme: 'bg-[#F0DCC7]', image: './images/7f4e5232b2a9ea92.jpg',
    summary: '用半天尝尝长沙，把返程也当作旅行的一部分。',
    schedule: [
      { time: '09:00', title: '长沙米粉早餐', desc: '睡够再出门，选择酒店附近的老店。', icon: 'ri-restaurant-line' },
      { time: '10:00', title: '老街散步', desc: '潮宗街、太平老街、坡子街按兴趣选两处即可。', icon: 'ri-road-map-line' },
      { time: '12:30', title: '回酒店取行李', desc: '提前前往长沙站，避免和午后客流硬挤。', icon: 'ri-suitcase-2-line' },
      { time: '14:17', title: '动车返回九江', desc: '参考D209，预计19:56到达；以12306出票为准。', icon: 'ri-train-line' }
    ],
    food: ['长沙米粉', '糖油粑粑', '小炒黄牛肉'], stay: '温暖的家', energy: 40, note: '若返程车次有调整，优先保留1.5小时进站缓冲。'
  }
];

export const slowRules = [
  { icon: 'ri-number-1', title: '每天一个重点', desc: '其余景点都是可选项，没走完也不遗憾。' },
  { icon: 'ri-timer-flash-line', title: '排队超过45分钟就换方案', desc: '把黄金时间留给风景，而不是队伍。' },
  { icon: 'ri-cup-line', title: '每天留出一杯咖啡的空白', desc: '不查攻略、不看时间，只看看街上的人。' }
];

export const checklist = [
  { id: 'train', label: '昆明→丽江动车票', icon: 'ri-train-line' },
  { id: 'return', label: '长沙→九江返程票', icon: 'ri-ticket-2-line' },
  { id: 'snow', label: '玉龙雪山预约', icon: 'ri-landscape-line' },
  { id: 'hotel', label: '三地住宿确认', icon: 'ri-hotel-line' },
  { id: 'idcard', label: '身份证件', icon: 'ri-id-card-line' },
  { id: 'coat', label: '保暖外套', icon: 'ri-shirt-line' },
  { id: 'sunblock', label: '防晒与墨镜', icon: 'ri-sun-line' },
  { id: 'medicine', label: '常用药品', icon: 'ri-capsule-line' }
];
