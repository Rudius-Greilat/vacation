const routeStops = [
  { city: '南昌', date: '10.01', note: '晚间出发', icon: 'ri-flight-takeoff-line', color: 'bg-[#E8D4BE]' },
  { city: '昆明', date: '10.01—10.04', note: '住 3 晚', icon: 'ri-sun-cloudy-line', color: 'bg-[#DCE9D4]' },
  { city: '丽江', date: '10.04—10.06', note: '住 2 晚', icon: 'ri-landscape-line', color: 'bg-[#D6E3EA]' },
  { city: '长沙 → 九江', date: '10.06—10.07', note: '住 1 晚', icon: 'ri-train-line', color: 'bg-[#E6DCEB]' }
];

const days = [
  {
    date: '10.01', week: '周四', city: '南昌 → 昆明', label: '落地就休息', theme: 'bg-[#E8D4BE]', image: './assets/images/6bb84b297ae78632.jpg',
    summary: '今晚没有任务，安全抵达就是今天最好的完成。',
    schedule: [
      { time: '晚间', title: '从南昌出发', desc: '提前到达机场，办理值机后找个安静的位置休息。', icon: 'ri-flight-takeoff-line' },
      { time: '22:20', title: '抵达昆明', desc: '取行李后直接打车前往酒店，不安排夜间景点。', icon: 'ri-flight-land-line' },
      { time: '23:30', title: '入住休息', desc: '如果饿了就在酒店附近简单吃一点，早点睡。', icon: 'ri-hotel-bed-line' }
    ],
    food: ['便利店补给', '清淡宵夜'], stay: '翠湖 / 东风广场 / 昆明老街附近', energy: 20, note: '预留40—60分钟用于取行李和叫车。'
  },
  {
    date: '10.02', week: '周五', city: '昆明', label: '翠湖慢生活', theme: 'bg-[#DCE9D4]', image: './assets/images/bb6f3c6522f271d9.jpg',
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
    date: '10.03', week: '周六', city: '昆明', label: '滇池吹风', theme: 'bg-[#D9E6ED]', image: './assets/images/0c5d8a61d10321f1.jpg',
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
    date: '10.04', week: '周日', city: '昆明 → 丽江', label: '坐着看风景', theme: 'bg-[#EADFCF]', image: './assets/images/22f399cd550f5012.jpg',
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
    date: '10.05', week: '周一', city: '丽江', label: '雪山与蓝湖', theme: 'bg-[#D6E3EA]', image: './assets/images/8c4542e69e249b99.jpg',
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
    date: '10.06', week: '周二', city: '丽江 → 长沙', label: '古镇发呆', theme: 'bg-[#E5DEEC]', image: './assets/images/9d55ed90cbd7c2ff.jpg',
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
    date: '10.07', week: '周三', city: '长沙 → 九江', label: '一碗粉再回家', theme: 'bg-[#F0DCC7]', image: './assets/images/7f4e5232b2a9ea92.jpg',
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

const slowRules = [
  { icon: 'ri-number-1', title: '每天一个重点', desc: '其余景点都是可选项，没走完也不遗憾。' },
  { icon: 'ri-timer-flash-line', title: '排队超过45分钟就换方案', desc: '把黄金时间留给风景，而不是队伍。' },
  { icon: 'ri-cup-line', title: '每天留出一杯咖啡的空白', desc: '不查攻略、不看时间，只看看街上的人。' }
];

const checklist = [
  { id: 'train', label: '昆明→丽江动车票', icon: 'ri-train-line' },
  { id: 'return', label: '长沙→九江返程票', icon: 'ri-ticket-2-line' },
  { id: 'snow', label: '玉龙雪山预约', icon: 'ri-landscape-line' },
  { id: 'hotel', label: '三地住宿确认', icon: 'ri-hotel-line' },
  { id: 'idcard', label: '身份证件', icon: 'ri-id-card-line' },
  { id: 'coat', label: '保暖外套', icon: 'ri-shirt-line' },
  { id: 'sunblock', label: '防晒与墨镜', icon: 'ri-sun-line' },
  { id: 'medicine', label: '常用药品', icon: 'ri-capsule-line' }
];
const attractions = [
  {
    city: '昆明', name: '翠湖公园', badge: '主线', duration: '1.5—2小时', icon: 'ri-leaf-line',
    intro: '昆明市中心最舒服的城市公园，柳树、荷塘与老建筑围成一圈，本地人常在这里散步、唱歌和晒太阳。十月适合沿湖慢走，但通常还没到红嘴鸥大规模抵达的季节。',
    highlights: ['九龙池与湖心亭', '市民生活氛围', '可串联讲武堂'],
    booking: '免费，无需预约',
    transit: '住老街或翠湖：步行约10—25分钟；远处可乘地铁5号线至华山西路站，D口步行约8—10分钟。'
  },
  {
    city: '昆明', name: '云南陆军讲武堂', badge: '主线', duration: '1—1.5小时', icon: 'ri-building-line',
    intro: '创办于1909年的近代军事院校旧址，明黄色走马转角楼很有辨识度。这里曾走出朱德、叶剑英等将领，是理解云南近代史的一处重要入口。',
    highlights: ['百年军校历史', '黄色建筑长廊', '免费定时讲解'],
    booking: '免费，建议在官方微信公众号或“数字讲武”实名预约；目前可能因修缮部分开放，出发前再查公告。',
    transit: '翠湖西门出门即到，步行约2分钟；参观后步行约10分钟到黄公东街。'
  },
  {
    city: '昆明', name: '昆明老街', badge: '主线', duration: '2—3小时', icon: 'ri-building-4-line',
    intro: '以钱王街、光华街、文明街一带为核心，保留福林堂、酒杯楼等历史建筑。傍晚比白天更有氛围，适合慢逛小店、吃小吃，再走到金马碧鸡坊看夜景。',
    highlights: ['钱王街', '酒杯楼', '金马碧鸡坊'],
    booking: '街区免费，无需预约',
    transit: '从翠湖可经黄公东街与翠湖城市绿道步行约20—30分钟；不想走可打车约10分钟。'
  },
  {
    city: '昆明', name: '滇池·海埂公园', badge: '主线', duration: '2—3小时', icon: 'ri-water-flash-line',
    intro: '滇池岸边视野开阔，能看到西山“睡美人”的完整轮廓。十月重点是湖风、林荫路和日落，不必把“喂海鸥”当主要目标。',
    highlights: ['滇池湖景', '西山剪影', '傍晚日落'],
    booking: '公园免费，无需预约；游船、索道另购票',
    transit: '从翠湖片区可乘地铁5号线至大坝或迎海路站再步行/公交接驳，全程约50—70分钟；打车约35—50分钟。'
  },
  {
    city: '昆明', name: '西山龙门', badge: '弹性', duration: '3—4小时', icon: 'ri-mountain-line',
    intro: '沿山体栈道登临龙门，可俯瞰滇池与昆明城。景观很好，但台阶、窄路较多，是昆明段体力消耗最大的一项，仅在天气好且索道排队可接受时加入。',
    highlights: ['高处俯瞰滇池', '龙门石刻', '跨滇池索道'],
    booking: '建议提前线上购买索道票；旺季索道单程成人参考60元、往返100元，实际以景区当天为准。',
    transit: '从海埂公园北门到索道站可坐观光巴士约15—20分钟；乘封闭式滇池索道跨湖上山，返程可原路索道返回。'
  },
  {
    city: '昆明', name: '云南省博物馆', badge: '雨天备选', duration: '2.5—4小时', icon: 'ri-ancient-gate-line',
    intro: '从古滇青铜文明到南诏大理国，馆藏牛虎铜案、金翅鸟等代表性文物。适合雨天或对历史感兴趣时替换滇池行程，旁边还能顺游官渡古镇。',
    highlights: ['古滇青铜器', '南诏大理国文物', '官渡古镇顺游'],
    booking: '常设展免费，需在“数字云博”小程序或官方公众号实名预约；周二至周日开放，16:30前入馆，节假日以公告为准。',
    transit: '市中心乘地铁1号线至星耀路/珥季路附近后再短途打车，约45—60分钟；博物馆到官渡古镇步行约10—15分钟。'
  },
  {
    city: '丽江', name: '丽江古城', badge: '主线', duration: '3—4小时', icon: 'ri-road-map-line',
    intro: '世界文化遗产大研古城没有规整城墙，水系、石板街与纳西院落自然交织。四方街热闹，真正松弛的体验在五一街、七一街的小巷和忠义市场。',
    highlights: ['四方街', '忠义市场', '文昌宫观景'],
    booking: '古城街区免费；国庆如遇客流管控，建议提前关注“丽江古城游”官方渠道预约提示。木府、万古楼单独购票。',
    transit: '古城核心禁止机动车，只能步行。丽江站到南门/忠义市场可乘4路或18路，约40分钟；打车约25—35元。'
  },
  {
    city: '丽江', name: '玉龙雪山·云杉坪', badge: '主线', duration: '全天', icon: 'ri-snowflake-line',
    intro: '云杉坪位于海拔约3240米的高山草甸，背靠雪山、四周是原始云杉林。比冰川公园温和，仍能获得完整的雪山体验，更符合这趟旅行的松弛节奏。',
    highlights: ['雪山草甸', '原始云杉林', '低强度索道'],
    booking: '必须提前实名预约进山门票与索道票。门票在“玉龙雪山服务”办理，索道在“丽江旅游集团”办理；国庆规则可能调整，建议提前7天开始关注。',
    transit: '古城忠义市场可乘101路雪山专线，单程参考15元、约1小时；更省心可订官方直通车或正规拼车。景区内乘环保车衔接索道与蓝月谷。'
  },
  {
    city: '丽江', name: '蓝月谷', badge: '主线', duration: '1.5—2小时', icon: 'ri-drop-line',
    intro: '雪山融水形成的蓝绿色湖泊群，晴天色彩最通透。沿湖步道并不长，不必追逐所有拍照机位，避开旅行团聚集区会更舒适。',
    highlights: ['蓝绿色湖水', '雪山倒影', '白水河瀑布'],
    booking: '包含在玉龙雪山进山行程中，本身不需另买索道票；仍需先完成景区入园预约。',
    transit: '从云杉坪索道下站乘景区环保车前往，按现场站牌上下车；游完再乘环保车回甘海子游客中心。'
  },
  {
    city: '丽江', name: '白沙古镇', badge: '主线', duration: '2—3小时', icon: 'ri-store-2-line',
    intro: '曾是纳西族木氏土司发祥地，比大研更安静质朴。主街尽头能望见玉龙雪山，适合逛扎染店、喝咖啡；对白沙壁画感兴趣可单独购票参观。',
    highlights: ['雪山街景', '纳西村落', '白沙壁画'],
    booking: '古镇免费；白沙壁画单独购票，开放与票价以现场为准。国庆可能限流，提前看官方通知。',
    transit: '从丽江古城打车约25—35分钟；也可在红太阳广场乘白沙古镇旅游专线，约60—75分钟。车辆停外围后步行进入。'
  },
  {
    city: '丽江', name: '束河古镇', badge: '备选', duration: '2—3小时', icon: 'ri-home-heart-line',
    intro: '茶马古道上的古镇，九鼎龙潭、青龙桥一带比大研古城更清幽。如果白沙逛完还有精力再去，若已经累了就直接回酒店，不必两座古镇都打卡。',
    highlights: ['青龙桥', '九鼎龙潭', '安静院落'],
    booking: '古镇通常免费，客流高峰可能需要线上预约；以当天官方公告为准。',
    transit: '白沙完小乘6路约35分钟到束河；打车约10—15元。束河回大研古城可乘111路或打车约15—25元。'
  },
  {
    city: '长沙', name: '潮宗街·太平老街', badge: '主线', duration: '2—3小时', icon: 'ri-store-line',
    intro: '潮宗街适合看历史街巷、咖啡馆与旧建筑，太平老街和坡子街则更热闹、适合集中尝小吃。只有半天时建议潮宗街和太平老街二选一，避免来回赶。',
    highlights: ['老长沙街巷', '小吃集中', '步行可串联'],
    booking: '开放街区，无需预约',
    transit: '住五一广场可步行约10—20分钟；住芙蓉广场可乘地铁2号线1站到五一广场，或打车约10分钟。前往长沙站乘2号线约10分钟。'
  }
];

const transportLegs = [
  { from: '翠湖公园', to: '讲武堂', mode: '步行', time: '2—5分钟', detail: '从翠湖西门过街即到，最适合连游。', icon: 'ri-walk-line' },
  { from: '讲武堂', to: '昆明老街', mode: '步行 / 打车', time: '25分钟 / 10分钟', detail: '体力好可走黄公东街与城市绿道；累了直接打车。', icon: 'ri-taxi-line' },
  { from: '翠湖片区', to: '海埂公园', mode: '地铁＋公交', time: '约60分钟', detail: '5号线往宝丰方向，在大坝/迎海路一带换乘接驳；两人以上打车更轻松。', icon: 'ri-subway-line' },
  { from: '海埂公园', to: '滇池索道', mode: '观光巴士', time: '约15—20分钟', detail: '海埂公园北门上车；假期堵车时按现场引导步行或候车。', icon: 'ri-bus-line' },
  { from: '昆明酒店', to: '昆明站', mode: '打车', time: '约20—35分钟', detail: '国庆建议在发车前60—90分钟离店，优先选择昆明站始发车。', icon: 'ri-train-line' },
  { from: '丽江站', to: '古城外围', mode: '打车 / 4路、18路', time: '25—40分钟', detail: '有行李建议打车到南门或北门，再步行进古城。', icon: 'ri-taxi-line' },
  { from: '丽江古城', to: '玉龙雪山', mode: '101路 / 直通车', time: '约60—80分钟', detail: '101路从忠义市场附近出发；预约索道时段后倒推发车时间。', icon: 'ri-bus-line' },
  { from: '丽江古城', to: '白沙古镇', mode: '打车 / 旅游专线', time: '35分钟 / 75分钟', detail: '上午去建议打车省体力；返程时间充裕再坐公交。', icon: 'ri-roadster-line' },
  { from: '丽江古城', to: '三义机场', mode: '网约车 / 接送机', time: '约45—60分钟', detail: '10月6日最迟17:30出发，避开傍晚古城周边拥堵。', icon: 'ri-flight-takeoff-line' },
  { from: '五一广场', to: '长沙站', mode: '地铁2号线', time: '约10分钟', detail: '无需换乘，带行李建议至少提前60分钟从酒店出发。', icon: 'ri-subway-line' }
];
const bookingGuide = [
  {
    level: '必须抢', color: 'bg-[#F3D4C5]', icon: 'ri-alarm-warning-line', title: '玉龙雪山进山票＋云杉坪索道', deadline: '建议 9月28日起重点关注',
    steps: ['在“玉龙雪山服务”小程序实名录入同行人，办理进山门票与环保车', '在“丽江旅游集团”小程序完成人脸认证并购买云杉坪索道票', '保存订单和入园时段，10月5日携带身份证原件'],
    note: '国庆票务规则和放票时点可能临时调整，提前7天起每天核对官方公告；不要相信非正规“代抢包票”。'
  },
  {
    level: '建议预约', color: 'bg-[#DCE9D4]', icon: 'ri-government-line', title: '云南陆军讲武堂', deadline: '参观前 1—5 天',
    steps: ['关注“云南陆军讲武堂历史博物馆”官方公众号', '按开放区域选择时段并实名预约', '到场前确认修缮进度及国庆开放公告'],
    note: '2026年场馆曾实施文物维修，部分阶段仅开放东门广场。若主体未开放，拍完建筑外观后直接去黄公东街。'
  },
  {
    level: '雨天备选', color: 'bg-[#D9E6ED]', icon: 'ri-building-2-line', title: '云南省博物馆', deadline: '建议提前 1—3 天',
    steps: ['在“数字云博”小程序或官方公众号实名预约', '选择上午时段，至少预留2.5小时', '携带身份证，常设展免费，特展可能另收费'],
    note: '通常周一闭馆，法定节假日安排以官方公告为准；16:30停止入馆。'
  },
  {
    level: '提前购票', color: 'bg-[#E5DEEC]', icon: 'ri-cable-car-line', title: '滇池索道 / 西山龙门', deadline: '天气确认后提前 1 天',
    steps: ['先看天气、风力和索道运营公告', '线上购买滇池索道票，减少现场排队', '决定是否进入龙门核心区，门票和景交可能单独计费'],
    note: '国庆旺季滇池索道成人票参考单程60元、往返100元，价格和运营时间以当天通知为准。排队超过45分钟建议放弃。'
  },
  {
    level: '同步确认', color: 'bg-[#F0DCC7]', icon: 'ri-train-line', title: '两段铁路票', deadline: '12306 开售当天',
    steps: ['先购买10月4日昆明站至丽江站直达动车', '再购买10月7日长沙站至九江返程车票', '无票立即提交候补，并准备相邻时段备选'],
    note: '页面车次仅作时间规划参考，国庆加开、停运和时刻调整均以12306最终出票为准。'
  }
];

const hotelAreas = [
  {
    city: '昆明', area: '昆明老街 / 南屏街', best: '本行程首选', icon: 'ri-shopping-bag-3-line',
    reason: '晚上回酒店前还能轻松吃饭逛街，去翠湖约10—20分钟，去昆明站也较方便，综合最均衡。',
    picks: [
      { name: '昆明南屏步行街老街亚朵酒店', type: '品质型', why: '老街核心，适合重视睡眠、早餐和稳定服务的人。' },
      { name: '昆明南屏步行街老街桔子水晶酒店', type: '舒适型', why: '步行逛老街方便，周边餐饮选择多。' },
      { name: '昆明老街五一路亚朵X酒店', type: '交通型', why: '靠近地铁，兼顾老街、翠湖和跨城出发。' }
    ],
    caution: '国庆老街周边夜间热闹，订房时备注高楼层、远离电梯和临街房。'
  },
  {
    city: '昆明', area: '翠湖 / 云南大学', best: '氛围感首选', icon: 'ri-leaf-line',
    reason: '早晨下楼就是翠湖，去讲武堂、文林街非常省力，更像在昆明生活几天。',
    picks: [
      { name: '全季酒店（昆明翠湖老街店）', type: '性价比', why: '品牌稳定，翠湖与老街都能兼顾。' },
      { name: '昆明翠湖云南大学亚朵酒店', type: '品质型', why: '靠近翠湖和云南大学，安静度通常更好。' },
      { name: '昆明翠湖丽瑞德酒店', type: '景观型', why: '可看翠湖与西山方向景观，适合想提升住宿体验。' },
      { name: '昆明中维翠湖宾馆', type: '预算充足', why: '出门即翠湖，老牌酒店，位置最省脚力。' }
    ],
    caution: '去滇池和昆明站的距离略长；若10月4日动车较早，提前约车。'
  },
  {
    city: '长沙', area: '芙蓉广场', best: '最推荐', icon: 'ri-subway-line',
    reason: '比五一广场核心安静一些，地铁2号线一站到五一广场，数站直达长沙站，特别适合深夜抵达后睡一晚。',
    picks: [
      { name: '长沙IFS国金中心芙蓉广场亚朵酒店', type: '品质型', why: '近地铁、可步行觅食，返程交通直接。' },
      { name: '长沙五一广场IFS国金中心锦江都城酒店', type: '性价比', why: '靠近芙蓉广场，逛街与去车站兼顾。' },
      { name: '欢致酒店（长沙IFS国金中心芙蓉广场地铁站店）', type: '年轻型', why: '位置方便、适合短住，周边小吃密集。' }
    ],
    caution: '确认前台可在10月6日23:45以后办理入住，并提前告知晚到。'
  },
  {
    city: '长沙', area: '五一广场 / 培元桥', best: '逛吃优先', icon: 'ri-restaurant-2-line',
    reason: '去太平老街、潮宗街、黄兴路最方便，早上出门即可游览；适合愿意接受更热闹环境的人。',
    picks: [
      { name: '长沙五一广场培元桥地铁站江景亚朵S酒店', type: '景观型', why: '离潮宗街近，江景与安静度相对更好。' },
      { name: '长沙IFS国金中心五一广场亚朵S酒店', type: '品质型', why: '核心商圈内但强调静谧，半日逛街最省时间。' },
      { name: '长沙五一广场湘江宾馆1968', type: '特色型', why: '历史建筑改造，适合想住得有城市记忆。' }
    ],
    caution: '五一广场夜间人流与车流很大，睡眠敏感者优先培元桥或芙蓉广场。'
  }
];

const foodGuide = [
  { city: '昆明', meal: '早餐', name: '小锅米线', desc: '小铜锅一人一份，肉末、韭菜与酸腌菜煮出鲜辣锅气。比过桥米线更日常，建议加臭豆腐或焖肉帽。', area: '文林街、老街附近', spicy: '微辣可调', icon: 'ri-bowl-line' },
  { city: '昆明', meal: '正餐', name: '过桥米线', desc: '滚烫鸡汤以油封温，按先荤后素、最后下米线的顺序烫食。初次体验点中档套餐即可，不必追求配料最多。', area: '建新园、桥香园等老字号', spicy: '不辣', icon: 'ri-restaurant-line' },
  { city: '昆明', meal: '晚餐', name: '野生菌火锅', desc: '十月仍可能赶上菌季尾声。选择正规餐厅，听从服务员计时，所有菌子完全煮熟后再吃，绝不自行夹生菌。', area: '市区正规菌火锅店', spicy: '清鲜', icon: 'ri-fire-line' },
  { city: '昆明', meal: '正餐', name: '汽锅鸡', desc: '建水紫陶汽锅依靠蒸汽凝成清汤，鸡味温润，适合连续吃辣后调整口味，可搭配老奶洋芋和烧豆腐。', area: '福照楼等滇菜馆', spicy: '不辣', icon: 'ri-goblet-line' },
  { city: '昆明', meal: '小吃', name: '烧饵块', desc: '烤到微焦的米制饵块刷甜酱、腐乳或辣酱，再裹油条、鸡蛋，像昆明版的中式三明治。', area: '翠湖、篆新市场周边', spicy: '可不辣', icon: 'ri-cake-3-line' },
  { city: '昆明', meal: '小吃', name: '豆花米线', desc: '嫩豆花、肉酱、甜酱油与花生碎拌粗米线，咸甜酸辣交织，适合两人分食再留胃给其他小吃。', area: '钱局街、老街周边', spicy: '微辣', icon: 'ri-bowl-fill' },
  { city: '昆明', meal: '伴手礼', name: '现烤鲜花饼', desc: '重瓣玫瑰入馅，刚出炉时酥皮和花香最好。少量现吃即可，返程前再买密封装，避免一路携带。', area: '南屏街、昆明老街', spicy: '甜口', icon: 'ri-flower-line' },
  { city: '丽江', meal: '晚餐', name: '腊排骨火锅', desc: '风干排骨与蔬菜同煮，咸香温暖。优先去象山市场或新城正规餐馆，口味比古城主街更生活化。', area: '象山市场、新城', spicy: '不辣', icon: 'ri-fire-line' },
  { city: '丽江', meal: '小吃', name: '鸡豆凉粉', desc: '用当地鸡豆制作，可凉拌也可煎食。凉拌酸辣爽口，煎制外香内软，适合做古城逛吃中的小份补给。', area: '忠义市场、古城小巷', spicy: '可调', icon: 'ri-restaurant-2-line' },
  { city: '丽江', meal: '正餐', name: '纳西烤肉', desc: '五花肉烤至皮脆肉香，常配薄荷、蘸水一起吃。建议搭配水性杨花等清爽蔬菜，避免整桌过咸。', area: '忠义市场外围、白沙', spicy: '微辣', icon: 'ri-knife-line' },
  { city: '丽江', meal: '早餐', name: '土鸡米线', desc: '清早来一碗热汤米线，补充雪山日前需要的碳水和盐分；当天不要空腹上山。', area: '古城南门、忠义市场', spicy: '可不辣', icon: 'ri-bowl-line' },
  { city: '长沙', meal: '早餐', name: '长沙米粉', desc: '鲜米粉配骨汤与现炒码子，肉丝、牛肉或杂酱都合适。早点说明少辣，避免刚从云南回来肠胃突然承压。', area: '酒店附近社区粉店', spicy: '可不辣', icon: 'ri-bowl-line' },
  { city: '长沙', meal: '小吃', name: '臭豆腐', desc: '黑色豆腐炸到外脆内嫩，戳开后灌入蒜蓉辣汁和萝卜丁。趁热吃一小份即可，不必在网红长队久等。', area: '太平街、黄兴路', spicy: '中辣', icon: 'ri-contrast-drop-line' },
  { city: '长沙', meal: '小吃', name: '糖油粑粑', desc: '糯米团裹着焦糖色糖壳，外微脆、内软糯。刚出锅很烫，适合和臭豆腐一咸一甜分着吃。', area: '南门口、太平街', spicy: '甜口', icon: 'ri-cake-2-line' },
  { city: '长沙', meal: '正餐', name: '小炒黄牛肉', desc: '黄牛肉与小米椒急火快炒，锅气足、很下饭。只有半天时若吃正餐，可和辣椒炒肉、清炒时蔬三选二。', area: '五一广场周边湘菜馆', spicy: '较辣', icon: 'ri-fire-fill' },
  { city: '长沙', meal: '解辣', name: '紫苏桃子姜', desc: '桃子、嫩姜浸在紫苏糖水里，酸甜清脆，很适合搭配湘菜与小吃解辣。', area: '老街小吃店', spicy: '酸甜', icon: 'ri-goblet-2-line' }
];
