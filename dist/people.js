const people = [
  {
    "name": "苏轼",
    "title": "多才的表达者",
    "v": [
      5,
      3,
      4,
      2,
      4,
      2,
      3,
      2
    ],
    "fact": "他的诗文、书法和绘画作品均有传世。",
    "url": "https://www.dpm.org.cn/lemmas/242068.html"
  },
  {
    "name": "李白",
    "title": "远行的诗人",
    "v": [
      5,
      2,
      5,
      1,
      5,
      2,
      3,
      2
    ],
    "fact": "他曾出蜀远游，并留下大量诗歌作品。",
    "url": "https://pedia.cloud.edu.tw/Entry/WikiContent?search=%E6%9D%8E%E7%99%BD&title=%E6%9D%8E%E7%99%BD"
  },
  {
    "name": "杜甫",
    "title": "关怀世事的诗人",
    "v": [
      2,
      3,
      2,
      4,
      3,
      4,
      4,
      4
    ],
    "fact": "他的诗歌记录了战争、动荡和百姓生活。",
    "url": "https://chiculture.org.hk/en/china-five-thousand-years/1938"
  },
  {
    "name": "李清照",
    "title": "细腻的词人",
    "v": [
      4,
      2,
      2,
      3,
      4,
      4,
      3,
      4
    ],
    "fact": "她是宋代词人，作品涉及个人生活与时代经历。",
    "url": "https://www.liverpool.ac.uk/languages-cultures-and-film/blog/2021/li-quingzhao/"
  },
  {
    "name": "司马迁",
    "title": "执笔记录的人",
    "v": [
      3,
      4,
      2,
      5,
      2,
      5,
      5,
      5
    ],
    "fact": "他撰写了纪传体通史《史记》。",
    "url": "https://www.dpm.org.cn/lemmas/240631.html"
  },
  {
    "name": "诸葛亮",
    "title": "运筹规划的人",
    "v": [
      2,
      5,
      3,
      5,
      2,
      3,
      5,
      5
    ],
    "fact": "他是蜀汉政治人物，参与治理与军事决策。",
    "url": "https://mainuat.chiculture.org.hk/sc/china-five-thousand-years/1905"
  },
  {
    "name": "孔子",
    "title": "重视教与学的人",
    "v": [
      2,
      3,
      4,
      5,
      2,
      4,
      4,
      5
    ],
    "fact": "他被后世视为思想家与教育者。",
    "url": "https://plato.stanford.edu/entries/confucius/"
  },
  {
    "name": "郑和",
    "title": "向远方出发的人",
    "v": [
      5,
      4,
      4,
      4,
      2,
      3,
      5,
      3
    ],
    "fact": "他曾率船队远航，行经印度洋等地区。",
    "url": "https://exploration.marinersmuseum.org/subject/zheng-he/"
  },
  {
    "name": "徐霞客",
    "title": "行走的观察者",
    "v": [
      5,
      4,
      1,
      2,
      3,
      5,
      2,
      4
    ],
    "fact": "他以旅行考察和记录见闻闻名。",
    "url": "https://uw.manifoldapp.org/read/6e5a06f1-95fb-43b4-8666-172a494e9d50/section/9a847070-0499-43b9-982b-e65da3a65139"
  },
  {
    "name": "李时珍",
    "title": "细致的求知者",
    "v": [
      4,
      5,
      2,
      5,
      1,
      5,
      4,
      4
    ],
    "fact": "他是明代医药学家，著有《本草纲目》。",
    "url": "https://hbszyy.cn/html/about/about-70.html"
  },
  {
    "name": "曹雪芹",
    "title": "观察人间的讲述者",
    "v": [
      4,
      2,
      1,
      3,
      5,
      5,
      1,
      3
    ],
    "fact": "他是清代小说家，代表作是《红楼梦》。",
    "url": "https://s.visitbeijing.com.cn/attraction/118056"
  },
  {
    "name": "鲁迅",
    "title": "独立思考的写作者",
    "v": [
      4,
      5,
      2,
      3,
      3,
      3,
      4,
      5
    ],
    "fact": "他是中国现代文学的重要作家。",
    "url": "https://u.osu.edu/mclc/online-series/lu-xun/"
  },
  {
    "name": "达·芬奇",
    "title": "好奇的探索者",
    "v": [
      5,
      5,
      2,
      2,
      5,
      1,
      3,
      2
    ],
    "fact": "他在绘画、设计和科学等多个领域留下作品。",
    "url": "https://www.nationalgallery.org.uk/artists/leonardo-da-vinci"
  },
  {
    "name": "居里夫人",
    "title": "专注的求知者",
    "v": [
      4,
      5,
      1,
      5,
      2,
      5,
      4,
      5
    ],
    "fact": "她研究放射性，并获得物理学和化学诺贝尔奖。",
    "url": "https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/"
  },
  {
    "name": "爱因斯坦",
    "title": "追问世界的思考者",
    "v": [
      5,
      5,
      3,
      2,
      5,
      4,
      3,
      4
    ],
    "fact": "他因理论物理研究和光电效应方面的工作获得诺贝尔奖。",
    "url": "https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/"
  },
  {
    "name": "达尔文",
    "title": "耐心观察的探索者",
    "v": [
      5,
      5,
      1,
      4,
      2,
      5,
      3,
      3
    ],
    "fact": "他提出以自然选择为核心的演化理论。",
    "url": "https://www.nhm.ac.uk/discover/charles-darwin-most-famous-biologist.html"
  },
  {
    "name": "莎士比亚",
    "title": "描绘人间的剧作家",
    "v": [
      4,
      2,
      5,
      3,
      5,
      3,
      4,
      2
    ],
    "fact": "他在英国戏剧界工作，并创作了戏剧和诗歌。",
    "url": "https://www.folger.edu/explore/shakespeares-life/"
  },
  {
    "name": "简·奥斯汀",
    "title": "观察日常的小说家",
    "v": [
      3,
      2,
      2,
      4,
      3,
      4,
      2,
      3
    ],
    "fact": "她是英国小说家，创作了《傲慢与偏见》等作品。",
    "url": "https://janeaustensociety.org.uk/jane-austen/biography/"
  },
  {
    "name": "南丁格尔",
    "title": "改善照护的行动者",
    "v": [
      3,
      4,
      4,
      5,
      1,
      4,
      5,
      5
    ],
    "fact": "她是护士和社会改革者，也使用统计图表展示公共卫生问题。",
    "url": "https://www.kcl.ac.uk/people/florence-nightingale"
  },
  {
    "name": "梵高",
    "title": "执着创作的画家",
    "v": [
      5,
      1,
      1,
      2,
      5,
      5,
      2,
      4
    ],
    "fact": "他是荷兰画家，留下大量绘画作品。",
    "url": "https://www.vangoghmuseum.nl/en/art-and-stories/art/vincent-van-gogh"
  },
  {
    "name": "武则天",
    "title": "开创时代的女皇",
    "v": [
      4,
      4,
      4,
      5,
      2,
      4,
      5,
      2
    ],
    "fact": "她是唐高宗的皇后，后来称帝建立武周。",
    "url": "https://www.britannica.com/biography/Wuhou"
  },
  {
    "name": "曹操",
    "title": "志在千里的谋略家",
    "v": [
      4,
      4,
      4,
      4,
      4,
      2,
      5,
      2
    ],
    "fact": "他是东汉末年的政治家、军事家和诗人。",
    "url": "https://www.britannica.com/biography/Cao-Cao"
  },
  {
    "name": "岳飞",
    "title": "严于律己的将领",
    "v": [
      2,
      2,
      3,
      5,
      2,
      4,
      5,
      5
    ],
    "fact": "他是南宋抗金将领。",
    "url": "https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/chi-edu/recommended-passages/KS3_20.pdf"
  },
  {
    "name": "陶渊明",
    "title": "归隐田园的诗人",
    "v": [
      2,
      2,
      1,
      1,
      4,
      4,
      1,
      5
    ],
    "fact": "他是东晋诗人，辞官后归隐田园。",
    "url": "https://www.britannica.com/biography/Tao-Qian"
  },
  {
    "name": "庄子",
    "title": "逍遥想象的思想家",
    "v": [
      5,
      2,
      1,
      1,
      5,
      2,
      1,
      4
    ],
    "fact": "他是战国时期的思想家。",
    "url": "https://www.britannica.com/biography/Zhuangzi"
  },
  {
    "name": "屈原",
    "title": "上下求索的诗人",
    "v": [
      2,
      2,
      1,
      2,
      5,
      4,
      4,
      5
    ],
    "fact": "他是战国时期楚国诗人，著有《离骚》。",
    "url": "https://www.britannica.com/biography/Qu-Yuan"
  },
  {
    "name": "林徽因",
    "title": "兼通建筑与诗的人",
    "v": [
      5,
      4,
      4,
      4,
      5,
      2,
      4,
      4
    ],
    "fact": "她是建筑学家和文学家。",
    "url": "https://www.tsinghua.edu.cn/info/1182/111612.htm"
  },
  {
    "name": "海伦·凯勒",
    "title": "勇敢冒险的写作者",
    "v": [
      5,
      2,
      4,
      4,
      4,
      4,
      4,
      5
    ],
    "fact": "她幼年失明失聪，后来成为作家和社会活动家。",
    "url": "https://quoteinvestigator.com/2014/11/21/adventure/"
  },
  {
    "name": "贝多芬",
    "title": "与命运较劲的作曲家",
    "v": [
      4,
      2,
      1,
      2,
      5,
      5,
      5,
      5
    ],
    "fact": "他是德国作曲家，在听力衰退后继续创作。",
    "url": "https://www.classical-music.com/articles/10-best-beethoven-quotes/"
  },
  {
    "name": "牛顿",
    "title": "追问规律的科学家",
    "v": [
      3,
      5,
      1,
      4,
      3,
      5,
      3,
      4
    ],
    "fact": "他是英国物理学家和数学家。",
    "url": "https://www.lindahall.org/about/news/scientist-of-the-day/isaac-newton-3/"
  },
  {
    "name": "范蠡",
    "title": "功成转身的商人",
    "v": [
      4,
      4,
      4,
      3,
      2,
      1,
      3,
      1
    ],
    "fact": "他辅佐越王灭吴后离开，转而经商致富。",
    "url": "https://en.wikipedia.org/wiki/Fan_Li"
  },
  {
    "name": "张良",
    "title": "功成身退的谋士",
    "v": [
      3,
      5,
      2,
      4,
      2,
      2,
      1,
      2
    ],
    "fact": "他辅佐刘邦建立汉朝，后来淡出权力中心。",
    "url": "https://en.wikipedia.org/wiki/Zhang_Liang_(Western_Han)"
  },
  {
    "name": "王维",
    "title": "山水间的诗人",
    "v": [
      2,
      2,
      1,
      3,
      4,
      2,
      1,
      3
    ],
    "fact": "他是唐代诗人和画家，晚年常居辋川别业。",
    "url": "https://en.wikipedia.org/wiki/Wang_Wei_(Tang_dynasty)"
  },
  {
    "name": "王阳明",
    "title": "知行合一的思想家",
    "v": [
      4,
      5,
      4,
      3,
      3,
      4,
      4,
      5
    ],
    "fact": "他提出“知行合一”，也曾领兵平定叛乱。",
    "url": "https://en.wikipedia.org/wiki/Wang_Yangming"
  },
  {
    "name": "唐伯虎",
    "title": "放达不羁的才子",
    "v": [
      4,
      2,
      4,
      2,
      5,
      2,
      1,
      2
    ],
    "fact": "他是明代书画家和诗人，自号“桃花庵主”。",
    "url": "https://en.wikipedia.org/wiki/Tang_Yin"
  },
  {
    "name": "刘邦",
    "title": "善用人才的开国皇帝",
    "v": [
      4,
      2,
      5,
      1,
      2,
      1,
      5,
      1
    ],
    "fact": "他出身平民，建立了汉朝。",
    "url": "https://en.wikipedia.org/wiki/Liu_Bang"
  },
  {
    "name": "苏格拉底",
    "title": "街头追问的哲人",
    "v": [
      4,
      5,
      5,
      1,
      3,
      4,
      1,
      5
    ],
    "fact": "他在雅典与人对话诘问，自己没有留下著作。",
    "url": "https://en.wikipedia.org/wiki/Socrates"
  },
  {
    "name": "富兰克林",
    "title": "样样都试的实干家",
    "v": [
      4,
      4,
      5,
      4,
      3,
      1,
      4,
      2
    ],
    "fact": "他是印刷商、作家、科学家，也是美国开国元勋。",
    "url": "https://en.wikipedia.org/wiki/Benjamin_Franklin"
  },
  {
    "name": "上官婉儿",
    "title": "掌管诏命的才女",
    "v": [
      3,
      4,
      4,
      4,
      3,
      3,
      5,
      1
    ],
    "fact": "她在武则天和唐中宗时期掌管诏命。",
    "url": "https://en.wikipedia.org/wiki/Shangguan_Wan%27er"
  },
  {
    "name": "杨贵妃",
    "title": "通晓音律的贵妃",
    "v": [
      3,
      1,
      5,
      2,
      4,
      3,
      2,
      2
    ],
    "fact": "她善歌舞、通音律，是唐玄宗的贵妃。",
    "url": "https://en.wikipedia.org/wiki/Yang_Guifei"
  }
];
