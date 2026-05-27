import type { Movie } from "@/types";

const SOURCE_URL =
  "https://zh.wikipedia.org/wiki/2026%E5%B9%B4%E4%B8%AD%E5%9C%8B%E5%A4%A7%E9%99%B8%E9%9B%BB%E5%BD%B1%E4%BD%9C%E5%93%81%E5%88%97%E8%A1%A8";

const rawMovies2026 = `
2026-01-01	过家家	Whispers of Gratitude	李太言	成龙、彭昱畅、张佳宁、潘斌龙	https://upload.wikimedia.org/wikipedia/zh/3/3a/Unexpected_Family.png
2026-01-01	一路福星	Lucky All the Way	贾凯	句号、舒耀瑄、李嘉明
2026-01-06	月光里的男孩	Dog Tashi	达杰丁增	久美江措、更旦、尕玛久美
2026-01-09	半夜叫你别回头2	Midnight Whisper II	陆诗雷	梅琼、赵翊骁、姜梦茹
2026-01-10	96分钟：列车爆炸案	96 Minutes	洪子烜	林柏宏、宋芸桦、王柏杰	https://upload.wikimedia.org/wikipedia/zh/f/ff/96_Minutes.jpg
2026-01-10	不过是上班	Nothing More Just A Job	王梓骏	吴俊霆、李孝谦
2026-01-16	马腾你别走	Every Dog Has Its Day	岳洋	林更新、李幼斌、宋茜、王彦霖、李雪琴、冯雷
2026-01-16	盖世神功		刘哲元	林雪、钟一宪、张全蛋、金刚、林盛斌、詹瑞文、罗家英、陈启泰、林敏聪、李尚正
2026-01-16	八府巡按	The Investigating Censor	李敏	李琦、王牧瑄、郁晓东、朱云龙
2026-01-16	情缘曹雪芹		刘春梅	王小毅、王玉凤、漆子美
2026-01-17	飞行家	Take Off	鹏飞	蒋奇明、李雪琴、董宝石、王彦霖、雷佳音	https://upload.wikimedia.org/wikipedia/zh/5/5e/%E9%A3%9E%E8%A1%8C%E5%AE%B62026.png
2026-01-17	我的朋友安德烈	My Friend An Delie	董子健	刘昊然、董子健、殷桃、韩昊霖、迟兴楷、董宝石、宁理、章若楠
2026-01-20	解决专家	Trouble Shooter	张敏、韩冬绪	黄才伦、邱意浓、林子聪
2026-01-23	改邪归正		夏咏	张桐、高姝瑶
2026-01-23	爆水管	Busted Water Pipes	周涤啡	彭于晏、艾伦、周游、闫佩伦、杨皓宇、潘斌龙	https://upload.wikimedia.org/wikipedia/zh/a/a3/Busted_Water_Pipes.jpg
2026-01-24	翠湖	As The Water Flows	卞灼	李振平、王娟
2026-01-24	舒克贝塔之微缩人类	Shuke and Beita: The Miniature Humans	郑亚旗	动画片
2026-01-24	宇宙护卫队：百变流星		刘彭	动画片
2026-01-28	年年岁岁	Undoing Time	李璞	赵正达、谢慧文、沈诗雨
2026-01-30	太空异种	Space Mutation	朱凌锋	魏璐、林妍柔
2026-01-30	东北警察故事3	Fight Against Evil 3	杨秉佳	谢苗、林晓杰、崔志佳、黄米依、伍允龙
2026-01-31	非传统浪漫关系	Wish You Well	梁文哲	朱颜曼滋、任彬、赵小棠、王天放、于谨维
2026-01-31	没问题	I'm OK	蒋佳辰	梁龙、范帅琦、徐洁儿
2026-02-06	六六大顺	May All Six Aspects of Life Go Smoothly	李孟武、陈康太	李孟武、肖轶、安悦溪
2026-02-07	替身拳手	Shadow	李霄峰	阿如那、马伯骞、胡军、王耀庆、李雪琴
2026-02-14	藏地情书	Enjoy Your Journey	久美成列	屈楚萧、邱天、马苏
2026-02-14	喜欢上“欠欠”的你	Love Go Go Go!	翁子光	秦霄贤、王影璐、马天宇、海清、范明、鄂靖文
2026-02-14	遇见不同的遇见	Love is on the Way	刘德强	高晓攀、李萌萌
2026-02-17	星河入梦	Per Aspera ad Astra	韩延	王鹤棣、宋茜、祖峰、罗海琼、汪铎	https://upload.wikimedia.org/wikipedia/zh/5/5b/Poster_of_Per_Aspera_Ad_Astra.jpg
2026-02-17	飞驰人生3	Pegasus 3	韩寒	沈腾、尹正、黄景瑜、张本煜、魏翔、沙溢、范丞丞、孙艺洲、段奕宏、张新成、胡先煦	https://upload.wikimedia.org/wikipedia/zh/5/5a/Pegasus_3.png
2026-02-17	镖人：风起大漠	Blades of the Guardians	袁和平	吴京、谢霆锋、李连杰、于适、陈丽君、孙艺洲、此沙、李云霄、惠英红、梁家辉、张晋、张译、刘耀文、董思成、文俊辉、于荣光、白那日苏、孟鹤堂、代乐乐、淳于珊珊	https://upload.wikimedia.org/wikipedia/zh/3/35/%E9%95%96%E4%BA%BA%EF%BC%9A%E9%A3%8E%E8%B5%B7%E5%A4%A7%E6%BC%A0.png
2026-02-17	熊猫计划之部落奇遇记	Panda Plan: The Magical Tribe	许宏宇	成龙、马丽、乔杉、王影璐、张子栋、王成思、潘斌龙、于荣光	https://upload.wikimedia.org/wikipedia/zh/4/4e/Panda_Plan_The_Magical_Tribe.png
2026-02-17	惊蛰无声		张艺谋	易烊千玺、朱一龙、宋佳、雷佳音、杨幂、张译、刘诗诗、刘耀文	https://upload.wikimedia.org/wikipedia/zh/a/a5/%E9%9B%BB%E5%BD%B1%E9%A9%9A%E8%9F%84%E7%84%A1%E8%81%B2%E5%AE%A3%E5%82%B3%E6%B5%B7%E5%A0%B1.jpg
2026-02-17	熊出没·年年有熊	Boonie Bears: The Hidden Protector	林汇达	动画片	https://upload.wikimedia.org/wikipedia/zh/f/f9/Boonie_Bears_The_Hidden_Protector.jpg
2026-02-20	夜王	Night King	吴炜伦	黄子华、郑秀文、王丹妮、廖子妤
2026-02-28	团圆令	The Reunion Journey	马腾	动画片
2026-03-07	青云塔三姐妹	Three Sisters of Qingyun Tower	布一贤	刘凡菲、陈嘉敏、李柏蓉、杨奇鸣
2026-03-10	熊猫奇遇记	Panda: Call of the Wild	梁碧波、蒋浩、蔡琦	纪录片
2026-03-13	神头岭1938		沈东	刘家祎、宋伊人
2026-03-13	哀牢山	Ailao Mountain Incident	王子仁、窦微	闵星翰、付妤舒
2026-03-14	拼桌	A Table For Two	吴靖	王传君、江疏影、李雪琴、郑云龙、傅首尔、刘佳、白举纲、田小洁、罗海琼、齐溪、许龄月
2026-03-14	上学路上之山海无阻	Ways to School	范立欣	纪录片
2026-03-20	时间旅馆	Reflections in the Lake	翟义祥	张本煜、王佳佳、苇青
2026-03-21	长夜将尽	Wild Nights, Tamed Beasts	王通	万茜、饶晓志、屈楚萧、黄小蕾
2026-03-25	蓝海	Blue Sea	宋金笑	胡钰莹、王杍逸
2026-03-26	甜咸之间		王丽文、王子	鲍起静、刘丹、李建义、李晓峰
2026-03-28	搜查瑠公圳	Where the River Flows	赖俊羽	朱轩洋、吴卓源、张世、梁修身、朱栢康、姚淳耀
2026-03-28	蜂蜜的针	No Other Love	袁梅	袁泉、耿乐、宁静、俞飞鸿、齐溪、陈冲、余皑磊、杨子姗、刘雅瑟、窦靖童
2026-03-28	醒来之一路向阳		李萍萍	刘伟、杨韵然、王春来
2026-04-03	我，许可	It's ok	杨荔钠	文淇、秦海璐、白客、李雪琴
2026-04-03	我的妈耶	Now I Met Her	肖麓西	马思纯、白客、黄明昊、孙阳、梁靖康
2026-04-03	凌晨两点半3		张雷雨	WIMONRAT KOOMPA、杨润坤、郜玄铭
2026-04-03	八子参军		朱赵伟	张曼君
2026-04-03	蝴蝶楼·惊魂	The Caged Butterfly	郝瀚、王哲	李梦、刘思维、姜卓君
2026-04-04	如父如母	Fatherless	燕文薪	孙艺荀、邢昀、刘蕾
2026-04-04	天才游戏	Game of Identity	程亮	彭昱畅、丁禹兮、邓恩熙、李蔓瑄、侯雯元
2026-04-04	阳光女子合唱团	Sunshine Women's Choir	林孝谦	陈意涵、翁倩玉
2026-04-10	角头：大桥头	GATAO: Like Father Like Son	姚宏易、姜瑞智	施名帅、郑人硕、张再兴
2026-04-10	寒·露	The Furthest Distance in the World	王强	顾婷萱、李君峰、文雅懿、何旭健
2026-04-14	植物学家	The Botanist	景一	叶斯力·加和斯力克、任紫晗
2026-04-18	器子	Organ Child	简学彬	张孝全、李沐、娄峻硕
2026-04-18	不能错过的只有你2	Nobody but you	陈晨	吴翊歌、李萌萌
2026-04-20	这，就是青春	The Prime of Life	孟奇	陈芋米、向俞星
2026-04-22	勇者无疆	Brave Without Boundaries	翌翔	刘思博、郭艳、何达、刘玮婷
2026-04-24	登月(第一部)	Missions to the Moon Part One	乔岩、狄欣、郭业琦	纪录片
2026-04-28	燃比娃	A Story About Fire	李文愉	动画片
2026-04-30	给阿嬷的情书	Dear You	蓝鸿春	李思潼、王彦桐、吴少卿
2026-04-30	怖偶惊情		唐明智	吴佳欣、王坤
2026-05-01	寒战1994	Cold War 1994	梁乐民	吴彦祖、刘俊谦、谢君豪、吴慷仁、王丹妮、廖子妤、周润发、郭富城、梁家辉、古天乐
2026-05-01	消失的人	Vanishing Point	程伟豪	郑恺、刘浩存、邱泽、李晨、姜妍、黄小蕾、李梦、毕雯珺、冯兵
2026-05-01	10间敢死队	Being Toward Death	陈思诚	蒋龙、齐溪、王子川、杨超越、曹炳琨、倪大红、蔡明、丁嘉丽、成泰燊
2026-05-01	门牙	Front Teeth	李心	章宇、陈昊宇
2026-05-01	猪猪侠大电影之竞速小英雄	GG Bond: Race Through Time	古燕梅、王永健、钟彧	动画片
2026-05-03	我在苏州学非遗	China's Secret Garden-Suzhou	萧寒	纪录片
2026-05-08	青铜葵花	Qingtong & Kuihua	陈坤厚	韩陌、张宇轩、冯雪雅、谢凯琦、战菁一
2026-05-08	逢生：直面癌症	New Lease On Life: Facing Cancer	刘建中	纪录片
2026-05-16	一个男人和一个女人	A Man and a Woman	管虎	黄渤、倪妮、周励淇、林雪、鲍起静、伍咏薇、颜卓灵
2026-05-20	错过了，遗憾吗？	Be Yourself	黄石	庄达菲、王安宇、白客、敖子逸
2026-05-20	爱情城事	Tales of Taipei	张吉安、黄绮琳、许承杰、帕武·多杰、刘权慧、殷振豪、哈希德·阿米、黄婕妤、李心洁、谢沛如	伍佰、李心洁、郭书瑶、蔡振南、邓丽欣、方郁婷、郑秀文、刘冠廷、娄峻硕、郑中基、张震
2026-05-22	我们意外的勇气	Unexpected Courage	游绍翔	刘若英、薛仕凌、钟承翰、李霈瑜、吴念轩
2026-05-22	今晚正好	Crossing A Dawn	赵八斗	马思纯、陈昊森、张艺凡、宋洋、温茉言、吕星辰
2026-05-22	突破3000米的日月潭		安景鸿	李罗、李紫嫣、范逸臣、言承旭
2026-05-23	森中有林	All The Good Eyes	郑执	于和伟、高圆圆、韩庚、张天爱、乔杉、夏之光、宋小宝、谢可寅	https://upload.wikimedia.org/wikipedia/zh/4/42/%E6%A3%AE%E4%B8%AD%E6%9C%89%E6%9E%97%E6%B5%B7%E6%8A%A5.png
`.trim();

export const movies2026: Movie[] = rawMovies2026
  .split("\n")
  .map((line, index) => {
    const [releaseDate, title, originalTitle, director, cast, posterUrl = ""] = line.split("\t");
    const genre = inferGenres(title, originalTitle, cast);

    return {
      id: `cn-2026-${String(index + 1).padStart(3, "0")}`,
      title,
      originalTitle,
      posterUrl,
      releaseYear: 2026,
      releaseDate,
      genre,
      country: "中国",
      director,
      description: createDescription(title, director, cast, genre),
      rating: 0,
      duration: null,
      sourceUrl: SOURCE_URL,
      isCatalogVisible: true
    };
  })
  .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

function inferGenres(title: string, originalTitle: string, cast: string) {
  if (cast === "动画片") {
    return ["动画"];
  }
  if (cast === "纪录片") {
    return ["纪录"];
  }

  const text = `${title} ${originalTitle}`;
  if (/警察|警|爆炸|搜查|寒战|消失|夜王|惊魂|半夜|哀牢山|天才游戏|改邪归正|东北警察/.test(text)) {
    return ["悬疑", "犯罪"];
  }
  if (/拳手|镖人|勇者|敢死队|无疆|神功|八府巡按/.test(text)) {
    return ["动作"];
  }
  if (/太空|星河|异种|登月|宇宙|Time|Moon|Space|Astra/.test(text)) {
    return ["科幻"];
  }
  if (/情书|喜欢|遇见|爱情|浪漫|爱人|男人和一个女人|Be Yourself|Love|Romance|Woman/.test(text)) {
    return ["爱情", "剧情"];
  }
  if (/福星|上班|马腾|解决专家|没问题|六六大顺|飞驰|拼桌|我的妈耶|许可|Comedy|OK/.test(text)) {
    return ["喜剧", "剧情"];
  }
  if (/1938|参军|曹雪芹/.test(text)) {
    return ["历史", "剧情"];
  }

  return ["剧情"];
}

function createDescription(title: string, director: string, cast: string, genre: string[]) {
  if (cast === "动画片") {
    return `《${title}》是 2026 年中国大陆院线公映动画电影，来源于年度国产电影上映片单。`;
  }
  if (cast === "纪录片") {
    return `《${title}》是 2026 年中国大陆院线公映纪录电影，来源于年度国产电影上映片单。`;
  }

  const castText = cast ? `，${cast}主演` : "";
  return `《${title}》是 2026 年中国大陆院线公映${genre.join("/")}电影，由${director || "待补"}执导${castText}。`;
}
