import type { Movie } from "@/types";

const SOURCE_URLS: Record<number, string> = {
  2026: "https://zh.wikipedia.org/wiki/2026%E5%B9%B4%E4%B8%AD%E5%9C%8B%E5%A4%A7%E9%99%B8%E9%9B%BB%E5%BD%B1%E4%BD%9C%E5%93%81%E5%88%97%E8%A1%A8",
  2025: "https://zh.wikipedia.org/wiki/2025%E5%B9%B4%E4%B8%AD%E5%9C%8B%E5%A4%A7%E9%99%B8%E9%9B%BB%E5%BD%B1%E4%BD%9C%E5%93%81%E5%88%97%E8%A1%A8",
  2024: "https://zh.wikipedia.org/wiki/2024%E5%B9%B4%E4%B8%AD%E5%9C%8B%E5%A4%A7%E9%99%B8%E9%9B%BB%E5%BD%B1%E4%BD%9C%E5%93%81%E5%88%97%E8%A1%A8"
};

const rawMovieCatalog = `
2026	001	2026-01-01	过家家	Whispers of Gratitude	李太言	成龙、彭昱畅、张佳宁、潘斌龙	https://upload.wikimedia.org/wikipedia/zh/3/3a/Unexpected_Family.png	121
2026	002	2026-01-01	一路福星	Lucky All the Way	贾凯	句号、舒耀瑄、李嘉明
2026	003	2026-01-06	月光里的男孩	Dog Tashi	达杰丁增	久美江措、更旦、尕玛久美
2026	004	2026-01-09	半夜叫你别回头2	Midnight Whisper II	陆诗雷	梅琼、赵翊骁、姜梦茹
2026	005	2026-01-10	96分钟：列车爆炸案	96 Minutes	洪子烜	林柏宏、宋芸桦、王柏杰	https://upload.wikimedia.org/wikipedia/zh/f/ff/96_Minutes.jpg	118
2026	006	2026-01-10	不过是上班	Nothing More Just A Job	王梓骏	吴俊霆 、李孝谦
2026	007	2026-01-16	马腾你别走	Every Dog Has Its Day	岳洋	林更新、李幼斌、宋茜、王彦霖、李雪琴、冯雷
2026	008	2026-01-16	盖世神功		刘哲元	林雪、钟一宪、张全蛋、金剛、林盛斌、詹瑞文、罗家英、陈启泰、林敏驄、李尚正
2026	009	2026-01-16	八府巡按	The Investigating Censor	李敏	李琦、王牧瑄、郁晓东、朱云龙
2026	010	2026-01-16	情缘曹雪芹		刘春梅	王小毅、王玉凤、漆子美
2026	011	2026-01-17	飞行家	Take Off	鹏飞	蒋奇明、李雪琴、董宝石、王彦霖、雷佳音	https://upload.wikimedia.org/wikipedia/zh/5/5e/%E9%A3%9E%E8%A1%8C%E5%AE%B62026.png	122
2026	012	2026-01-17	我的朋友安德烈	My Friend An Delie	董子健	刘昊然、董子健、殷桃、韩昊霖、迟兴楷、董宝石、宁理、章若楠		113
2026	013	2026-01-20	解决专家	Trouble Shooter	张敏、韩冬绪	黄才伦、邱意浓、林子聪
2026	014	2026-01-23	改邪归正		夏咏	张桐、高姝瑶
2026	015	2026-01-23	爆水管	Busted Water Pipes	周涤啡	彭于晏、艾伦、周游、闫佩伦、杨皓宇、潘斌龙	https://upload.wikimedia.org/wikipedia/zh/a/a3/Busted_Water_Pipes.jpg	103
2026	016	2026-01-24	翠湖	As The Water Flows	卞灼	李振平、王娟
2026	017	2026-01-24	舒克贝塔之微缩人类	Shuke and Beita：The Miniature Humans	郑亚旗	动画片
2026	018	2026-01-24	宇宙护卫队：百变流星		刘彭	动画片
2026	019	2026-01-28	年年岁岁	Undoing Time	李璞	赵正达、谢慧文、沈诗雨
2026	020	2026-01-30	太空异种	Space Mutation	朱凌锋	魏璐、林妍柔
2026	021	2026-01-30	东北警察故事3	Fight Against Evil 3	杨秉佳	谢苗、林晓杰、崔志佳、黄米依、伍允龙		100
2026	022	2026-01-31	非传统浪漫关系	Wish You Well	梁文哲	朱颜曼滋、任彬、赵小棠、王天放、于谨维
2026	023	2026-01-31	没问题	I’m OK	蒋佳辰	梁龙、范帅琦、徐洁儿
2026	024	2026-02-06	六六大顺	May All Six Aspects of Life Go Smoothly	李孟武、陈康太	李孟武、肖轶、安悦溪
2026	025	2026-02-07	替身拳手	Shadow	李霄峰	阿如那、马伯骞、胡军、王耀庆、李雪琴
2026	026	2026-02-14	藏地情书	Enjoy Your Journey	久美成列	屈楚萧、邱天、马苏
2026	027	2026-02-14	喜欢上“欠欠”的你	Love Go Go Go!	翁子光	秦霄贤、王影璐、马天宇、海清、范明、鄂靖文
2026	028	2026-02-14	遇见不同的遇见	Love is on the Way	刘德强	高晓攀、李萌萌
2026	029	2026-02-17	星河入梦	Per Aspera ad Astra	韩延	王鹤棣、宋茜、祖峰、罗海琼、汪铎	https://upload.wikimedia.org/wikipedia/zh/5/5b/Poster_of_Per_Aspera_Ad_Astra.jpg	111
2026	030	2026-02-17	飞驰人生3	Pegasus 3	韩寒	沈腾、尹正、黄景瑜、张本煜、魏翔、沙溢、范丞丞、孙艺洲、段奕宏 、张新成、胡先煦	https://upload.wikimedia.org/wikipedia/zh/5/5a/Pegasus_3.png	125
2026	031	2026-02-17	镖人：风起大漠	Blades of the Guardians	袁和平	吴京、谢霆锋、李连杰、于适、陈丽君、孙艺洲、此沙、李云霄、惠英红、梁家辉、张晋、张译、刘耀文、董思成、文俊辉、于荣光、白那日苏、孟鹤堂、代乐乐、淳于珊珊	https://upload.wikimedia.org/wikipedia/zh/3/35/%E9%95%96%E4%BA%BA%EF%BC%9A%E9%A3%8E%E8%B5%B7%E5%A4%A7%E6%BC%A0.png	126
2026	032	2026-02-17	熊猫计划之部落奇遇记	Panda Plan: The Magical Tribe	许宏宇	成龙、马丽、乔杉、王影璐、张子栋、王成思、潘斌龙、于荣光	https://upload.wikimedia.org/wikipedia/zh/4/4e/Panda_Plan_The_Magical_Tribe.png	99
2026	033	2026-02-17	惊蛰无声		张艺谋	易烊千玺、朱一龙、宋佳、雷佳音、杨幂、张译、刘诗诗、刘耀文	https://upload.wikimedia.org/wikipedia/zh/a/a5/%E9%9B%BB%E5%BD%B1%E9%A9%9A%E8%9F%84%E7%84%A1%E8%81%B2%E5%AE%A3%E5%82%B3%E6%B5%B7%E5%A0%B1.jpg	104
2026	034	2026-02-17	熊出没·年年有熊	Boonie Bears: The Hidden Protector	林汇达	动画片	https://upload.wikimedia.org/wikipedia/zh/f/f9/Boonie_Bears_The_Hidden_Protector.jpg	118
2026	035	2026-02-20	夜王	Night King	吴炜伦	黄子华、郑秀文、王丹妮、廖子妤
2026	036	2026-02-28	团圆令	The Reunion Journey	马腾	动画片
2026	037	2026-03-07	青云塔三姐妹	Three Sisters of Qingyun Tower	布一贤	刘凡菲、陈嘉敏、李柏蓉、杨奇鸣
2026	038	2026-03-10	熊猫奇遇记	Panda: Call of the Wild	梁碧波、蒋浩、蔡琦	纪录片
2026	039	2026-03-13	神头岭1938		沈东	刘家祎、宋伊人
2026	040	2026-03-13	哀牢山	Ailao Mountain Incident	王子仁、窦微	闵星翰、付妤舒
2026	041	2026-03-14	拼桌	A Table For Two	吴靖	王传君、江疏影、李雪琴、郑云龙、傅首尔、刘佳、白举纲、田小洁、罗海琼、齐溪、许龄月
2026	042	2026-03-14	上学路上之山海无阻	Ways to School	范立欣	纪录片
2026	043	2026-03-20	时间旅馆	Reflections in the Lake	翟义祥	张本煜、王佳佳、苇青
2026	044	2026-03-21	长夜将尽	Wild Nights, Tamed Beasts	王通	万茜、饶晓志、屈楚萧、黄小蕾	https://upload.wikimedia.org/wikipedia/zh/7/72/Wild_Nights%2C_Tamed_Beasts.jpg
2026	045	2026-03-25	蓝海	Blue Sea	宋金笑	胡钰莹、王杍逸
2026	046	2026-03-26	甜咸之间		王丽文、王子	鲍起静、刘丹、李建义、李晓峰
2026	047	2026-03-28	搜查瑠公圳	Where the River Flows	赖俊羽	朱轩洋、吴卓源、张世、梁修身、朱栢康、姚淳耀		109
2026	048	2026-03-28	蜂蜜的针	No Other Love	袁梅	袁泉、耿乐、宁静、俞飞鸿、齐溪、陈冲、余皑磊、杨子姗、刘雅瑟、窦靖童		119
2026	049	2026-03-28	醒来之一路向阳		李萍萍	刘伟、杨韵然、王春来
2026	050	2026-04-03	我，许可	It's ok	杨荔钠	文淇、秦海璐、白客、李雪琴	https://upload.wikimedia.org/wikipedia/zh/1/1c/It%27s_OK_2026.jpg	118
2026	051	2026-04-03	我的妈耶	Now I Met Her	肖麓西	马思纯、白客、黄明昊、孙阳、梁靖康	https://upload.wikimedia.org/wikipedia/zh/c/c4/Now_I_Met_Her.jpg	121
2026	052	2026-04-03	凌晨两点半3		张雷雨	WIMONRAT KOOMPA、杨润坤、郜玄铭
2026	053	2026-04-03	八子参军		朱赵伟	张曼君
2026	054	2026-04-03	蝴蝶楼·惊魂	The Caged Butterfly	郝瀚、王哲	李梦、刘思维、姜卓君		91
2026	055	2026-04-04	如父如母	Fatherless	燕文薪	孙艺荀、邢昀、刘蕾
2026	056	2026-04-04	天才游戏	Game of Identity	程亮	彭昱畅、丁禹兮、邓恩熙、李蔓瑄、侯雯元
2026	057	2026-04-04	阳光女子合唱团	Sunshine Women's Choir	林孝谦	陈意涵、翁倩玉	https://upload.wikimedia.org/wikipedia/zh/4/47/%E9%99%BD%E5%85%89%E5%A5%B3%E5%AD%90%E5%90%88%E5%94%B1%E5%9C%98%E6%B5%B7%E5%A0%B1.jpg	134
2026	058	2026-04-10	角头：大桥头	GATAO: Like Father Like Son	姚宏易、姜瑞智	施名帅、郑人硕、张再兴	https://upload.wikimedia.org/wikipedia/zh/c/cd/GATAO_Like_Father_Like_Son_poster.jpg	130
2026	059	2026-04-10	寒·露	The Furthest Distance in the World	王强	顾婷萱、李君峰、文雅懿、何旭健
2026	060	2026-04-14	植物学家	The Botanist	景一	叶斯力·加和斯力克、任紫晗	https://upload.wikimedia.org/wikipedia/zh/b/b4/The_Botanist_%28Zhi_Wu_Xue_Jia%29_2025_film_poster.jpg	96
2026	061	2026-04-18	器子	Organ Child	简学彬	张孝全、李沐、娄峻硕	https://upload.wikimedia.org/wikipedia/zh/1/15/%E5%99%A8%E5%AD%90%E6%B5%B7%E5%A0%B1.jpg	108
2026	062	2026-04-18	不能错过的只有你2	Nobody but you	陈晨	吴翊歌、李萌萌
2026	063	2026-04-20	这，就是青春	The Prime of Life	孟奇	陈芋米、向俞星
2026	064	2026-04-22	勇者无疆	Brave Without Boundaries	翌翔	刘思博、郭艳、何达、刘玮婷
2026	065	2026-04-24	登月(第一部)	Missions to the Moon Part One	乔岩、狄欣、郭业琦	纪录片
2026	066	2026-04-28	燃比娃	A Story About Fire	李文愉	动画片	https://upload.wikimedia.org/wikipedia/zh/f/fe/%E7%87%83%E6%AF%94%E5%A8%83%E6%B5%B7%E6%8A%A5.png	85
2026	067	2026-04-30	给阿嬷的情书	Dear You	蓝鸿春	李思潼、王彦桐、吴少卿	https://upload.wikimedia.org/wikipedia/zh/8/84/%E7%BB%99%E9%98%BF%E5%AC%B7%E7%9A%84%E6%83%85%E4%B9%A6_%E7%94%B5%E5%BD%B1.png	118
2026	068	2026-04-30	怖偶惊情		唐明智	吴佳欣、王坤
2026	069	2026-05-01	寒战1994	Cold War 1994	梁乐民	吴彦祖、刘俊谦、谢君豪、吴慷仁、王丹妮、廖子妤、周润发、郭富城、梁家辉、古天乐	https://upload.wikimedia.org/wikipedia/zh/9/9d/Cold_War_1994_poster.jpg	117
2026	070	2026-05-01	消失的人	Vanishing Point	程伟豪	郑恺、刘浩存、邱泽、李晨、姜妍、黄小蕾、李梦、毕雯珺、冯兵	https://upload.wikimedia.org/wikipedia/zh/7/71/%E6%B6%88%E5%A4%B1%E7%9A%84%E4%BA%BA%E6%B5%B7%E6%8A%A5.png	140
2026	071	2026-05-01	10间敢死队	Being Toward Death	陈思诚	蒋龙、齐溪、王子川、杨超越、曹炳琨、倪大红、蔡明、丁嘉丽、成泰燊	https://upload.wikimedia.org/wikipedia/zh/a/a2/10%E9%97%B4%E6%95%A2%E6%AD%BB%E9%98%9F.png	120
2026	072	2026-05-01	门牙	Front Teeth	李心	章宇、陈昊宇		105
2026	073	2026-05-01	猪猪侠大电影之竞速小英雄	GG Bond: Race Through Time	古燕梅、王永健、钟彧	动画片
2026	074	2026-05-03	我在苏州学非遗	China's Secret Garden-Suzhou	萧寒	纪录片
2026	075	2026-05-08	青铜葵花	Qingtong & Kuihua	陈坤厚	韩陌、张宇轩、冯雪雅、谢凯琦、战菁一
2026	076	2026-05-08	逢生：直面癌症	New Lease On Life: Facing Cancer	刘建中	纪录片
2026	077	2026-05-16	一个男人和一个女人	A Man and a Woman	管虎	黄渤、倪妮、周励淇、林雪、鲍起静、伍咏薇、颜卓灵	https://upload.wikimedia.org/wikipedia/zh/0/06/A_Man_and_a_woman_2024_film_poster.jpg	117
2026	078	2026-05-20	错过了，遗憾吗？	Be Yourself	黄石	庄达菲、王安宇、白客、敖子逸
2026	079	2026-05-20	爱情城事	Tales of Taipei	张吉安、黄绮琳、许承杰、帕武·多杰、刘权慧、殷振豪、哈希德·阿米、黄婕妤、李心洁、谢沛如	伍佰、李心洁、郭书瑶、蔡振南、邓丽欣、方郁婷、郑秀文、刘冠廷、娄峻硕、郑中基、张震		116
2026	080	2026-05-22	我们意外的勇气	Unexpected Courage	游绍翔	刘若英、薛仕凌、钟承翰、李霈瑜、吴念轩
2026	081	2026-05-22	今晚正好	Crossing A Dawn	赵八斗	马思纯、陈昊森、张艺凡、宋洋、温茉言、吕星辰
2026	082	2026-05-22	突破3000米的日月潭		安景鸿	李罗、李紫嫣、范逸臣、言承旭
2026	083	2026-05-23	森中有林	All The Good Eyes	郑执	于和伟、高圆圆、韩庚、张天爱、乔杉、夏之光、宋小宝、谢可寅	https://upload.wikimedia.org/wikipedia/zh/4/42/%E6%A3%AE%E4%B8%AD%E6%9C%89%E6%9E%97%E6%B5%B7%E6%8A%A5.png	117
2025	001	2025-01-01	街一边水一边		刘丰鸣	史可、李墨之
2025	002	2025-01-03	火锅艺术家	Hot Pot Artist	崔志佳	崔志佳、焦俊艳、宋小宝、乔杉、魏翔、艾伦
2025	003	2025-01-03	小城季风	Out of Place	金向怡	陈雅狄、吴天圆、高铣莛、田鈊
2025	004	2025-01-08	问山	Ask the Mountain	许磊	张浩、师清峰、李珈西
2025	005	2025-01-10	假爸爸	Fake Dad	贾冰	贾冰、尹正、倪虹洁、徐峥、丁嘉丽、王迅、杨皓宇、包贝尔 、刘桦、夏梦
2025	006	2025-01-10	大红包2：龙凤呈祥	Big Red Envelope 2: Get Rich	李克龙	李克龙、李春嫒
2025	007	2025-01-10	碟仙玩偶	Tracking in Blood	陆诗雷	陈嘉敏、韩玉杰、李梓瑜
2025	008	2025-01-11	恶行之外	Beyond The Sin	郭文奇	古天乐、林家栋、林嘉欣、张继聪、王敏奕、车婉婉、孙佳君	https://upload.wikimedia.org/wikipedia/zh/6/6b/%E6%83%A1%E8%A1%8C%E4%B9%8B%E5%A4%96%E9%9B%BB%E5%BD%B1%E6%B5%B7%E5%A0%B1.jpg	90
2025	009	2025-01-11	超级望望	Super Wangwang	孔令首	潘斌龙、吴雨泽、樊昱君、李庆誉、沙宝亮
2025	010	2025-01-18	真爱找麻烦！	Sweet Trouble	宋迪	乔杉、张本煜 、韩云云、李雪琴、尚语贤、海一天、九孔、种丹妮
2025	011	2025-01-18	莫莉的冒险	Molly	张荣吉	陈思诺、蒋勤勤、王千源、郭涛、方青卓
2025	012	2025-01-22	在他乡	Away From Home	李明阳	李明阳、艾秀梅
2025	013	2025-01-25	灶王传		马文卓、石卓奇、王紫丞	动画片
2025	014	2025-01-29	射雕英雄传：侠之大者	Legends of the Condor Heroes: The Gallants	徐克	肖战、庄达菲	https://upload.wikimedia.org/wikipedia/zh/6/61/The_Legend_of_the_Condor_Heroes_2025.jpg	146
2025	015	2025-01-29	封神第二部：战火西岐	Creation of the Gods II: Demon Force	乌尔善	费翔、黄渤、于适、李雪健、娜然	https://upload.wikimedia.org/wikipedia/zh/6/6c/%E5%B0%81%E7%A5%9E%E7%AC%AC%E4%BA%8C%E9%83%A8.jpg	144
2025	016	2025-01-29	蛟龙行动	Operation Leviathan	林超贤	黄轩、于适、杜江、蒋璐霞、王彦霖、韩东君、李九霄、段奕宏、张涵予、李晨	https://upload.wikimedia.org/wikipedia/zh/e/ec/Operation_Leviathan_poster.jpeg	146
2025	017	2025-01-29	唐探1900		陈思诚	王宝强、刘昊然、张新成、周润发、约翰·库萨克、张译、肖央、尹正、托尼·贾、韩雪、魏翔、李雪健、李宛妲、岳云鹏、小沈阳	https://upload.wikimedia.org/wikipedia/zh/8/8f/Detective_Chinatown_1900_poster.jpg	136
2025	018	2025-01-29	熊出没·重启未来	Boonie Bears:Future Reborn	林永长	动画片	https://upload.wikimedia.org/wikipedia/zh/3/3d/Boonie_Bears_Future_Reborn_poster.jpg	108
2025	019	2025-01-29	哪吒之魔童闹海	Ne Zha 2	饺子	动画片	https://upload.wikimedia.org/wikipedia/zh/b/b6/Ne_Zha_2_poster.jpg	144
2025	020	2025-02-14	边海		王辰六	赵英博、丁赵端儀
2025	021	2025-02-18	您的声音	Hotline Beijing	徐洁勤	纪录片
2025	022	2025-02-22	诡才之道	Talents Society	徐汉强	陈柏霖、张榕容、王净、姚以缇		110
2025	023	2025-02-22	天马星空	Unstoppable	杨锋	樊少皇、李立群
2025	024	2025-02-25	情满木兰	Love Magnolia	黄钰芳	白凯南、王雪纯、郭子煜
2025	025	2025-02-28	致命抉择	Fatal Choice	李锦伦	朱夏、秦立洋、徐峰、王乔
2025	026	2025-03-04	苍山	Like Winds, Like Weeds	张帆	郭柯宇、王诗云
2025	027	2025-03-07	多幸运遇见你	Love Island	田蒙	蓝盈莹、刘奕畅、盛一伦、林乐炫、贾冰、范湉湉、黄小蕾
2025	028	2025-03-08	平原上的火焰	Fire on the Plain	张骥	周冬雨、刘昊然、梅婷、袁弘、吕聿来、陈明昊、王学兵	https://upload.wikimedia.org/wikipedia/zh/2/28/%E5%B9%B3%E5%8E%9F%E4%B8%8A%E7%9A%84%E7%81%AB%E7%84%B0.jpeg	113
2025	029	2025-03-08	想飞的女孩	Girls on Wire	文晏	刘浩存、文淇、张宥浩、杨皓宇 、耿乐
2025	030	2025-03-08	天堂旅行团	Always Have Always Will	刘杰	彭昱畅、杨恩又、魏大勋、李雪琴、吴谨言、吕星辰
2025	031	2025-03-10	打铁花行动	Operation Iron Fireworks	刘潇	李肖宁、丁昀汐、张华、施大生
2025	032	2025-03-11	潮	Qian Tang River	万波	王铮、刘陆、陈雨浓
2025	033	2025-03-14	武替道	Stuntman	梁冠尧、梁冠舜	刘俊谦、董玮、伍允龙	https://upload.wikimedia.org/wikipedia/zh/c/c6/%E6%AD%A6%E6%9B%BF%E9%81%93.png	114
2025	034	2025-03-14	非标准恋爱		邢潇	管乐、周澄奥、姚弛
2025	035	2025-03-14	午夜怨灵		戴晗、胡帅	刘洛、何泽远
2025	036	2025-03-14	夜半凶宅	Nightmare Haunted House	王盈希、陈京	陈美行、王成钧、孙杨
2025	037	2025-03-15	真爱营业	Liar, Liar, Love is on Fire	吴雅文	郑合惠子、左凌峰、贾冰、李勤勤
2025	038	2025-03-15	久别·重逢	Last Song For You	梁礼彦	郑伊健、陈卓贤、许恩怡、蔡思韵	https://upload.wikimedia.org/wikipedia/zh/9/94/Last_Song_For_You.jpg	110
2025	039	2025-03-22	我会好好的	New Life	董宏杰	张子枫、王景春、张子贤、王骁、张佳宁
2025	040	2025-03-22	怒水西流	The River of Fury	冯勇沁	宁理、王迅、刘敏涛、段博文、李春嫒、吕晓霖、陈都灵
2025	041	2025-03-25	追幸福的人	Clap Your Hands	祝捷	南吉、梁戟、吴玉玲珑
2025	042	2025-03-26	攀枝花红了	The Story of Panzhihua	杨心先	钟远林、温琼如
2025	043	2025-04-02	特别的你	Uniquely You	翁羽	纪录片
2025	044	2025-04-03	不说话的爱	Mumu	沙漠	张艺兴、李珞桉
2025	045	2025-04-03	不完美逃脱	A Long Shot	金川	卜冠今、庞瀚辰
2025	046	2025-04-04	猎狐行动	Fox Hunt	张立嘉	梁朝伟、段奕宏	https://upload.wikimedia.org/wikipedia/zh/0/08/Fox_Hunt_poster.png	105
2025	047	2025-04-04	向阳·花	We Girls	冯小刚	赵丽颖、兰西雅、啜妮、王菊、程潇	https://upload.wikimedia.org/wikipedia/zh/c/c1/We_Girls.jpg	124
2025	048	2025-04-04	阳光照耀青春里	The Way Out	曾海若	肖央、春夏、陈明昊、蒋奇明、王迅、赵子琪、于明加、黄尧
2025	049	2025-04-04	午时三刻	The Deadline	童辉	罗立群、黄小超
2025	050	2025-04-08	东四十条	Dance Still	覃牧秋、詹涵淇	钱赓、杨凯航
2025	051	2025-04-12	命中罪爱		赵非	张静初、芦芳生、余皑磊
2025	052	2025-04-19	有病才会喜欢你		许富翔	詹怀云、江齐
2025	053	2025-04-19	钻石照耀钟鼓楼	Diamond Over Beijing	祁又一	沙宝亮、陈芋米
2025	054	2025-04-26	荣耀		常晓阳	李健
2025	055	2025-04-26	钢琴搬来搬去	Moving the Piano Around	张万一	方晓莉
2025	056	2025-04-30	水饺皇后	The Dumpling Queen	刘伟强	马丽、惠英红、朱亚文、王祖蓝、薛凯琪、谢天华、潘斌龙、袁富华、江美仪、太保、张达明	https://upload.wikimedia.org/wikipedia/zh/7/7c/The_Dumpling_Queen_poster.jpeg	119
2025	057	2025-05-01	大风杀	Trapped	张琪	白客、辛柏青、郎月婷、耿乐
2025	058	2025-05-01	猎金游戏	A Gilded Game	邱礼涛	刘德华、欧豪、倪妮、黄奕、蒋梦婕、郑则仕 、刘以豪、张晨光、田丽	https://upload.wikimedia.org/wikipedia/zh/d/dc/%E7%8D%B5%E9%87%91%E9%81%8A%E6%88%B2%E6%AD%A3%E5%BC%8F%E6%B5%B7%E5%A0%B1.jpg	129
2025	059	2025-05-01	苍茫的天涯是我的爱	I Grass I Love	陈孝良	曾毅、周奇、孙艺洲、柳岩、王玉雯、董宝石、黄曦彦、范明、符龙飞、肖央、王太利、孟鹤堂、印小天、张晓谦
2025	060	2025-05-01	人生开门红	The Open Door	易小星	常远、邓家佳、王耀庆、田雨、兰西雅、代乐乐、王迅、傅菁
2025	061	2025-05-01	开心超人之逆世营救		黄伟明	动画片
2025	062	2025-05-01	海底小纵队：海啸大危机		虞嘉尧、谭广威、孙耕、高嵩	动画片
2025	063	2025-05-01	宇宙护卫队：百变流星			动画片
2025	064	2025-05-07	地上的云朵	Fabric of Lives	刘帼轶	纪录片
2025	065	2025-05-09	祭屋		陈明	庞祯祺、康依凡、张晶晶
2025	066	2025-05-09	感谢生命中有个你		秦宇	秦宇、李芷珺、英壮、麦家琪
2025	067	2025-05-10	日暮归乡	Returning Home	杨正浓	纪录片		103
2025	068	2025-05-13	内沙	A Land Behind	杨弋枢	张丹、赵川、冯果、刘志林
2025	069	2025-05-17	独一无二	The One	王沐	张婧仪、陈明昊、蒋勤勤、辛云来、章宇、白客、陈昊森、董浩
2025	070	2025-05-17	冲·撞	Clash	蒋佳辰	李九霄、王千源、潘斌龙、杨皓宇、尚语贤、梁静、李雪琴、代乐乐、蒋诗萌
2025	071	2025-05-20	永不失联的爱	Everlasting Love	丁培	郭俊辰、孙伊涵、周彦辰、葛鑫怡、丁真珍珠、吕一
2025	072	2025-05-20	黑暗迷踪		柯伊善	柯伊善、朱宏
2025	073	2025-05-23	心理有秘密	Inner Secrets	闯闯	郑昊、刘园媛
2025	074	2025-05-23	家的方向	Return Home	梁青松、高熠欢	李光复、孙桂田、李立群
2025	075	2025-05-23	风起秋浦河	River of Memory	刘全玮	张秋歌、陈友旺
2025	076	2025-05-29	致命玩偶	Deadly Doll	彭发	张兆辉、王敏奕、罗兰
2025	077	2025-05-30	红嫁衣	Red Wedding Dress	徐俊、刘明亮	何雨宸、袁祥仁
2025	078	2025-05-30	时间之子	Endless Journey of Love	刘阔、于奥、周铁男	动画片	https://upload.wikimedia.org/wikipedia/zh/3/31/Shijianzhizi.jpg	107
2025	079	2025-05-31	私家侦探	Behind The Shadows	李子俊、周汶儒	古天乐、周秀娜、刘冠廷、黄浩然、杨偲泳、张兆辉、关德辉	https://upload.wikimedia.org/wikipedia/zh/8/81/%E9%9B%BB%E5%BD%B1%E7%A7%81%E5%AE%B6%E5%81%B5%E6%8E%A2.jpg	102
2025	080	2025-05-31	潜艇总动员：冒险岛			动画片
2025	081	2025-06-13	恋曲尘封	Wandering Days	吴有音	蒋雯丽、黄轩、黄小蕾、马思纯
2025	082	2025-06-14	分手清单	Love List	田羽生、夏雨	欧豪、曾梦雪、程潇、徐梦洁
2025	083	2025-06-17	但愿人长久	Fate of the Moonlight	秦天	徐海鹏、练雅佳
2025	084	2025-06-19	醉吴歌	Romance of Wu GE	金舸	孙晨竣、徐世昕、茅菁、李振宇
2025	085	2025-06-20	非常交易		黄健	小沈阳、姜武、杨蓉、高捷、马浴柯、林雪
2025	086	2025-06-20	好好说再见	The Shore of Life	张弛、王崑琳	钟欣潼、林栋甫、赵禹睿、陶慧敏
2025	087	2025-06-21	酱园弄·悬案	She Has No Name	陈可辛	章子怡、雷佳音	https://upload.wikimedia.org/wikipedia/zh/7/7b/Jiangyuanlong_film_poster.jpg	150
2025	088	2025-06-21	阿克达拉	Story of Cotton Field	张忠	李雪健、吴军、小沈阳	https://upload.wikimedia.org/wikipedia/zh/2/26/%E3%80%8A%E9%98%BF%E5%85%8B%E8%BE%BE%E6%8B%89%E3%80%8B%E6%B5%B7%E6%8A%A5.jpg	99
2025	089	2025-06-21	炽热年华	Flames of Resilience	常征、段国云	冯文娟、刘頔、吴昊宸
2025	090	2025-06-21	艺术学院1994	Story of Cotton Field	刘健	动画片		118
2025	091	2025-06-22	和我说早安	Good Morning to Me	孙佳	尚晓仪、白晓鸥、王劲松、许还幻
2025	092	2025-06-25	风起前的蒲公英	Bitter Sweet Ballad	梁君健、唐韬、刘张铂泷	纪录片
2025	093	2025-06-27	野马部落	The Origin	赵春梁	孙乐、刘家琦、冯四
2025	094	2025-06-27	山庄·惊魂	Horrible Mountain Villa	张少军	王小毅、金丽婷、刘锡明
2025	095	2025-06-28	夏季成人礼	Summer Ceremony	杨泷杰	岳旸、海一天、李乃文
2025	096	2025-06-28	人生会议	Life Party	宋晓飞	肖央、古力娜扎、王迅、杨皓宇、刘琳、王琳、代乐乐、王太利
2025	097	2025-07-04	小白船		耿子涵	周美君、黄子琪、梁静、梁龙
2025	098	2025-07-05	恶意	Malice	来牧宽、姚文逸	张小斐、黄轩、李庚希、梅婷
2025	099	2025-07-05	无名之辈：否极泰来		饶晓志	章宇、任素汐、潘斌龙、马吟吟
2025	100	2025-07-08	册杀	Threads of the Game	郑文政	牛骏峰、尚语贤、王奎荣、胡耘豪、李光复、陈俊安
2025	101	2025-07-10	天宝	Tian Bao	刘劲、艺兮	顿珠次仁
2025	102	2025-07-11	午夜游戏	Midnight Game	刘定	殷果儿、王楚渝
2025	103	2025-07-12	聊斋：兰若寺		崔月梅、刘源、谢君伟、邹靖、黄鹤宇、刘一林	动画片
2025	104	2025-07-18	花漾少女杀人事件	Girl On Edge	周璟豪	张子枫、马伊琍、丁湘源
2025	105	2025-07-18	你行！你上！	Let the Music Fly	姜文	姜文、马丽、葛优、雷佳音、胡歌、辛芷蕾、于和伟、余皑磊、何赛飞、丁志诚、王传君、甄子丹		144
2025	106	2025-07-18	长安的荔枝	The Litchi Road	大鹏	大鹏、杨幂、张若昀、王雨甜、刘德华、庄达菲	https://upload.wikimedia.org/wikipedia/zh/c/c3/The_Litchi_Road_poster.jpg	122
2025	107	2025-07-18	罗小黑战记2	The Legend of Hei 2	木头、顾杰	动画片	https://upload.wikimedia.org/wikipedia/zh/d/dc/The_Legend_of_Hei_2.jpg	120
2025	108	2025-07-25	戏台	The Stage	陈佩斯	陈佩斯、黄渤、姜武、尹正、杨皓宇、余少群	https://upload.wikimedia.org/wikipedia/zh/6/66/%E7%94%B5%E5%BD%B1%E3%80%8A%E6%88%8F%E5%8F%B0%E3%80%8B%E5%AE%9A%E6%A1%A3%E6%B5%B7%E6%8A%A5.jpg	125
2025	109	2025-07-25	南京照相馆	Dead To Rights	申奥	刘昊然、王传君、高叶、王骁、原岛大地、王真儿	https://upload.wikimedia.org/wikipedia/zh/6/61/Dead_To_Rights.png	137
2025	110	2025-07-25	奇幻西游：新世界	Pigsy	邱立伟	动画片	https://upload.wikimedia.org/wikipedia/zh/c/c9/Pigsy._jpeg.jpg	96
2025	111	2025-07-26	喜羊羊与灰太狼之异国破晓	Pleasant Goat and Big Big Wolf - Bright New Dawn	陈辉衍、梁嘉琪	动画片		96
2025	112	2025-08-02	直播间爱情故事		郑卫国、李烽	郑卫国
2025	113	2025-08-02	浪浪山小妖怪	Nobody	於水	动画片	https://upload.wikimedia.org/wikipedia/zh/c/c4/Nobody_2025_poster.jpg	118
2025	114	2025-08-02	猫和老鼠：星盘奇缘	Tom and Jerry: Forbidden Compass	张钢	动画片
2025	115	2025-08-08	奇遇	The Adventure	马多	贾冰、王皓、李梦、郑合惠子、杨皓宇、翟子路、费启鸣、李乃文、小沈阳
2025	116	2025-08-08	东极岛	Dongji Island	管虎、费振翔	朱一龙、吴磊、倪妮、杨皓宇、陈明昊、倪大红、李九霄		133
2025	117	2025-08-08	前任是座山	Former Boyfriend Is A Mountain	梁勇、萧楚浚	张馨鹤、王野、楚镇
2025	118	2025-08-10	不再退缩	Never Give Up	齐星	潘斌龙、侯佳音、左小青、徐佳
2025	119	2025-08-11	绑架毛乎乎	The Escaping Man	王一淳	姜武、闫妮、曾美慧孜、张博鑫、林家川
2025	120	2025-08-11	妖怪森林	LUDA	王世伟	动画片
2025	121	2025-08-15	坪石先生	Scholars Under Fire	甘小二	谢君豪
2025	122	2025-08-15	山河为证	Mountains and Rivers Bearing Witness	于鹏	动画片
2025	123	2025-08-16	捕风追影	The Shadow's Edge	杨子	成龙、张子枫、梁家辉、此沙、文俊辉、周政杰、王紫逸、郎月婷	https://upload.wikimedia.org/wikipedia/zh/c/c5/%E6%8D%95%E9%A2%A8%E8%BF%BD%E5%BD%B1%E9%A6%99%E6%B8%AF%E4%B8%8A%E6%98%A0%E6%B5%B7%E5%A0%B1.jpg	141
2025	124	2025-08-16	夏雨来		杨清希	赵曙光、方展荣、张集骏
2025	125	2025-08-16	非人哉：限时玩家	Fairizest: Rally for Pally	王利文、载水	动画片
2025	126	2025-08-19	后羿之箭神	Hou Yi - The Lord Archer	龚建明	动画片
2025	127	2025-08-20	放下手机	Put Down Your Phone	黄东升	胡子程、张旭辰、苇青
2025	128	2025-08-22	再见，坏蛋	Goodbye, Bad Guy	俞钟	陈明昊、陈宇喆、王宁、周晓鸥、张博、菅纫姿
2025	129	2025-08-22	无名指	My First of May	孔令政	郭富城、许恩怡、鲍起静、谭耀文、梁咏琪	https://upload.wikimedia.org/wikipedia/zh/5/53/%E9%9B%BB%E5%BD%B1%E7%84%A1%E5%90%8D%E6%8C%872025.jpg	90
2025	130	2025-08-23	赎梦	Peg O' My Heart	张家辉	张家辉、刘俊谦、陈法拉、袁富华、朱晨丽、李凯贤、袁绮雯、许恩怡、刘德华	https://upload.wikimedia.org/wikipedia/zh/8/8a/%E9%9B%BB%E5%BD%B1%E8%B4%96%E5%A4%A22025.jpg	97
2025	131	2025-08-23	脱缰者也	One Wacky Summer	曹保平	郭麒麟、齐溪、孙安可、常远、张本煜、林雪
2025	132	2025-08-29	有朵云像你	Gift from a Cloud	姚婷婷	屈楚萧、王子文、何蓝逗、吴彦姝
2025	133	2025-08-29	寻找1999的月老	Oriental Cupid	万沥方	叶童、陈柏融、马景涛、郑舒环
2025	134	2025-08-29	我们的那一年	The Year That Belongs to Us	袁秀芬	袁秀芬、马良
2025	135	2025-08-29	午夜凶镜	midnight mirror	陆诗雷	黄兴饶、殷果儿
2025	136	2025-08-29	7天		邱玉洁	蒋奇明、张艺凡
2025	137	2025-09-03	生还	Survival	高群书	邵正一、周思羽 、曹卫宇、杨奇鸣
2025	138	2025-09-03	营救飞虎	Against All Odd	刘浩良	韩庚、米切尔·霍格、陈永胜、王丹妮
2025	139	2025-09-05	甜蜜恰好也三十	Bestie Rivals	屈啸宇	赵文琪、杨悦心、钟骏胜、陈德容、黄柏钧
2025	140	2025-09-05	窗外是蓝星	Shen Zhou 13	朱翌冉	纪录片
2025	141	2025-09-10	我们终将要和世界握手言和	Shake Hands with the Life	苑世超	刘牧、英泽、桑平、杨静儿、傅铂涵
2025	142	2025-09-11	洛桑的家事	Life of Luosang	张国栋	金巴、扎西
2025	143	2025-09-12	午夜怪谈2	Midnight StoryⅡ	朱迅	熊婧文、韩陌、姚致远
2025	144	2025-09-12	别把作文当回事儿	Hello, Spring	马兰花	王谢嫣然、李宗航、张熙悦
2025	145	2025-09-12	家庭简史	Brief History of a Family	林见捷	祖峰、郭柯宇、孙浠伦
2025	146	2025-09-13	轻于鸿毛	Fishes Flied Away	周铨	宋佳、佟丽娅
2025	147	2025-09-13	熊孩子·探险熊兵	BEAR KID·SUPER HERO	庄潇	动画片
2025	148	2025-09-15	天大的事		吴双、黄笑江	邵峰、刘惠、韩三明
2025	149	2025-09-18	731		赵林山	姜武、王志文、李乃文、林子烨、孙茜、冯文娟、温碧霞	https://upload.wikimedia.org/wikipedia/zh/4/41/731_film.jpg	125
2025	150	2025-09-19	这周五的游乐场	Friday, Funfair	曾志	英泽、孔祥羽
2025	151	2025-09-19	临时决斗	Hit N Fun	麦启光	古天乐、梁咏琪、王丹妮、周秀娜	https://upload.wikimedia.org/wikipedia/zh/e/e8/%E8%87%A8%E6%99%82%E6%B1%BA%E9%AC%A52025.jpg	108
2025	152	2025-09-30	志愿军：浴血和平	The Volunteers: To the War 3	陈凯歌	张子枫、宋佳、朱亚文、陈飞宇、彭昱畅、肖央、王砚辉、郭涛、王传君、周政杰、张宥浩、吴昊宸 、王挺、郭晓东、李晨、杜江、冯绍峰、闫妮、阿如那、王雨甜、于谨维、王阳、张雪迎	https://upload.wikimedia.org/wikipedia/zh/5/50/%E5%BF%97%E6%84%BF%E5%86%9B%EF%BC%9A%E6%B5%B4%E8%A1%80%E5%92%8C%E5%B9%B3%E6%B5%B7%E6%8A%A5.png	143
2025	153	2025-09-30	浪浪人生	Row to Win	马林	黄渤、范丞丞、殷桃、常远、李嘉琦、刘雪华、孙艺洲、张本煜、刘德华	https://upload.wikimedia.org/wikipedia/zh/b/b8/%E6%B5%AA%E6%B5%AA%E4%BA%BA%E7%94%9F%E6%B5%B7%E5%A0%B1.png	123
2025	154	2025-10-01	刺杀小说家2	Assassin in Red 2	路阳	邓超、董子健、雷佳音、王圣迪、丁程鑫、王彦霖、张震、辛芷蕾、郭京飞、常远	https://upload.wikimedia.org/wikipedia/zh/2/29/A_Writer%27s_Odysseyposter.jpg	130
2025	155	2025-10-01	风林火山	Sons of the Neon Night	麦浚龙	金城武、刘青云、梁家辉、古天乐、高圆圆、鲍起静、任贤齐、杜德伟、林俊贤、卢冠廷、姜珮瑶	https://upload.wikimedia.org/wikipedia/zh/9/98/%E9%A2%A8%E6%9E%97%E7%81%AB%E5%B1%B12025.jpeg	132
2025	156	2025-10-01	毕正明的证明	The Return of The Lame Hero	佟志坚	王安宇、张天爱、王彦霖、冯兵	https://upload.wikimedia.org/wikipedia/zh/c/cc/%E6%AF%95%E6%AD%A3%E6%98%8E%E7%9A%84%E8%AF%81%E6%98%8E.png	124
2025	157	2025-10-01	猪猪侠·一只老猪的逆袭	I'm Bond, GG Bond	陆锦明、钟彧、李腾栋	动画片	https://upload.wikimedia.org/wikipedia/zh/6/69/%E7%8C%AA%E7%8C%AA%E4%BE%A0%C2%B7%E4%B8%80%E5%8F%AA%E8%80%81%E7%8C%AA%E7%9A%84%E9%80%86%E8%A2%AD.png	89
2025	158	2025-10-01	三国的星空第一部	Three Kingdoms: Starlit Heroes	于孟、袁原	动画片		122
2025	159	2025-10-04	震耳欲聋	Sound of Silence	万力	檀健次、兰西雅、王戈、王砚辉、潘斌龙	https://upload.wikimedia.org/wikipedia/zh/e/e5/%E9%9C%87%E8%80%B3%E6%AC%B2%E8%81%8B%E6%B5%B7%E6%8A%A5.png	120
2025	160	2025-10-04	极限城市	Extreme City	胡淑华	动画片
2025	161	2025-10-06	疯狂电脑城	Zap's Last Stand		动画片
2025	162	2025-10-11	巫咒		王文博	王楠楠、田诗雨
2025	163	2025-10-13	靠近我 看见你	We Are Together	江平、范雨林	牛犇、李木子、袁霆、何赛飞、郭晓东、翁虹
2025	164	2025-10-16	火种	Hope	陈剑飞	富大龙、姜武、田海蓉、王雨甜、黄俊鹏、王劲松
2025	165	2025-10-18	醉刀客	The Killer of Swordsmen	李炳渊	李炳渊
2025	166	2025-10-18	小山河	Nostalgia	彭臣	陈昊宇、吴彦姝、彦希、朱圣祎、郑罗茜、张铁林
2025	167	2025-10-18	父辈的天空	The Hump	牛子、达蒙·文亚德、杨正浓、黄若宾	纪录片
2025	168	2025-10-18	成为大师	Becoming A Master	赵林	纪录片
2025	169	2025-10-23	胡阿姨的花园	Ms. Hu's Garden	潘志琪	纪录片
2025	170	2025-10-24	向光花盛开	Going Home	黄志忠	黄志忠、赵润南、任重、江珊
2025	171	2025-10-24	陪你到清晨	When the Night Meets Light	田艳	纪录片
2025	172	2025-10-25	下一个台风	After Typhoon	李玉	张子枫、张伟丽、李心洁、姚晨
2025	173	2025-10-25	阳光俱乐部	Mostly Sunny	魏书钧	黄晓明、陆小芬、祖峰、贾樟柯、杨采钰、廖凡	https://upload.wikimedia.org/wikipedia/zh/0/0b/Don%27t_worry_be_happy_2024_film_poster.jpg	93
2025	174	2025-10-25	带你回家	A Journey of Blossoms	贺伯亚	王真儿、李萍、李媛
2025	175	2025-10-28	暗杠	Dark Bar	炼熔	梁爽、李正国
2025	176	2025-10-31	即兴谋杀	Her Turn	程亚楠	李庚希、邓家佳、刘奕铁、黄晓明、岳佳颐、赵胤胤、杨皓宇
2025	177	2025-10-31	象山发光事件	ILLUMINANT OBJECT	赵域	小沈阳、王唯、张登平、倪景阳
2025	178	2025-10-31	红嫁衣：纸新娘	Red Wedding Dress: Paper Bride	徐俊	何雨宸、贺刚、袁祥仁
2025	179	2025-11-01	女孩	Girl	舒淇	邱泽、汤毓绮、白小樱、林品彤、赖雨霏、刘品言	https://upload.wikimedia.org/wikipedia/zh/e/eb/Girl_2025_poster.jpeg	125
2025	180	2025-11-01	旁观者	Bystander	松太加	陈坤、王砚辉、刘敏涛、王劲松
2025	181	2025-11-03	深深眷恋	The Story of the Shovel	康健民	李岷城、余昊洋
2025	182	2025-11-05	白马姐妹	The Sisters of Baima Tibetan	张同道、梁伟	纪录片
2025	183	2025-11-07	日掛中天	The Sun Rises on Us Al	蔡尚君	辛芷蕾、张颂文、冯绍峰	https://upload.wikimedia.org/wikipedia/zh/a/a6/The_Sun_Rises_on_Us_All.webp	131
2025	184	2025-11-07	不要错过你	Penguin Girl	杨宥瑜	林奕岚、詹怀云	https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/%E5%91%BD%E4%B8%AD%E8%A8%BB%E5%AE%9A%E9%82%A3%E9%A0%AD%E9%B5%9D0314%E4%B8%8A%E6%98%A0.jpg/500px-%E5%91%BD%E4%B8%AD%E8%A8%BB%E5%AE%9A%E9%82%A3%E9%A0%AD%E9%B5%9D0314%E4%B8%8A%E6%98%A0.jpg	99
2025	185	2025-11-14	寻砖	Soul Searching	李伟	张亮、鄂靖文、刘俊孝
2025	186	2025-11-15	红豆	Little Red Sweet	邹颖	邓丽欣、任达华、魏浚笙、龚慈恩	https://upload.wikimedia.org/wikipedia/zh/e/ee/%E9%9B%BB%E5%BD%B1%E7%B4%85%E8%B1%86%E6%B5%B7%E5%A0%B1.jpg	90
2025	187	2025-11-15	三滴血		康博	胡歌、文淇、高子淇、闫妮、宋佳、高叶、欧豪、李雪琴、杨新鸣、艾丽娅、张本煜、汪铎
2025	188	2025-11-16	永无止境	Unstoppable	许慧晶	纪录片
2025	189	2025-11-18	神秘家书	Mysterious Family Letter	崔少红	于湉、黄锦燊、苑琼丹、黄恺杰
2025	190	2025-11-18	顺流而上	Up Stream	张力川	马思超、谭凯、李浩菲、张晞临、战菁一
2025	191	2025-11-18	百川东到海	Summer Diary	吴双	吴潘芮、王浩宇
2025	192	2025-11-18	百年程派	The Legacy of Peking Opera	邢川	纪录片
2025	193	2025-11-21	不该停止的追问	The Endless Inquiry	年世亚	柴蔚、刘迅、郑晓宁、王宁、李梦
2025	194	2025-11-21	风雪飘摇		董阿成	王宇、伊日贵、其那日图
2025	195	2025-11-21	孤岛幻想曲	Dark Love	龙佳宾	曹高波、朱雨欣
2025	196	2025-11-21	开心岭		刘全玮	巫刚
2025	197	2025-11-22	李子洲	Igniter	朱秋玥	于晓光、娜仁花、奚望
2025	198	2025-11-22	狂野时代	Resurrection	毕赣	易烊千玺、舒淇、赵又廷、李庚希、黄觉、陈永忠	https://upload.wikimedia.org/wikipedia/zh/6/6b/Kuangyeshida.jpg	160
2025	199	2025-11-25	隐者山河	Hidden Landscapes	郭旭锋	纪录片
2025	200	2025-11-27	我的世界没有我	My World without Me	田海蓉	田海蓉、谭凯、田海嫣、邵兵、佟瑞欣、张涵予
2025	201	2025-11-27	小丑爸爸		马建军	张天其、田诗雨、方青卓
2025	202	2025-11-27	菜肉馄饨	Shanghai Wonton	吴天戈	周野芒、潘虹、茅善玉、陈国庆、王琳、王菊、陈龙	https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/S2Y-0665_at_M_Tianmu_Rd%2C_Wuzhen_Rd_%2820251029104945%29.jpg/500px-S2Y-0665_at_M_Tianmu_Rd%2C_Wuzhen_Rd_%2820251029104945%29.jpg
2025	203	2025-11-28	英雄三元里	Hero Sanyuanli	王一诺	严屹宽、刘秋实
2025	204	2025-11-28	青爱	Love Youth	向凯	王劲松
2025	205	2025-11-28	半夜叫你别回头2	Midnight Whisper II	陆诗雷	梅琼、赵翊骁、姜梦茹
2025	206	2025-11-29	团圆必胜	My Best Bet	罗耀辉	蔡卓妍、张继聪	https://upload.wikimedia.org/wikipedia/zh/e/ef/%E7%A5%A5%E8%B3%AD%E5%BF%85%E8%B4%8F2025.jpg	105
2025	207	2025-12-02	野果之歌	The Night Rain South Township	李彬斌	袁家欢、陈宣宇
2025	208	2025-12-05	我最特别的朋友	Friends	王晓丰	张颂文、曾柯琅、陈永胜
2025	209	2025-12-05	金刚不坏	Nobody	李伟	乔杉、柳岩、梁龙、孙阳、杨新鸣、代乐乐
2025	210	2025-12-05	最好的朋友		宋卓非	杨智赫、城桧吏、段奥娟
2025	211	2025-12-05	清算		里洋	高捷、姜皓文、侯桐江
2025	212	2025-12-06	得闲谨制	Gezhi Town	孔笙	肖战、彭昱畅、周依然、尹正、杨新鸣、任程伟、阿如那、江奇霖、廖凡、祖峰	https://upload.wikimedia.org/wikipedia/zh/3/38/GezhiTown.jpg	121
2025	213	2025-12-06	内幕	Under Current	麦兆辉	郭富城、任达华、吴镇宇、方中信、陈国邦、汤怡、周励淇、李靖筠、姜大卫、骆应钧、鲍起静	https://upload.wikimedia.org/wikipedia/zh/6/68/%E9%9B%BB%E5%BD%B1%E5%85%A7%E5%B9%952025.jpg
2025	214	2025-12-06	比如父子	My Father’s Son	仇晟	宋洋、孙宁、孙安可、佟晨洁、罗伟宸、柯佳嬿
2025	215	2025-12-11	最恨我爱你		晓阳	殷旭、孟天鸿、杨昊铭
2025	216	2025-12-11	旺姆的夏天	Wangmu’s Summer	旦真旺甲	旺卓措、[久巴、[卓杰泽仁
2025	217	2025-12-12	水草长生	The Earth Abides	荀伟平	荀广辉、荀宝山、张顺波
2025	218	2025-12-12	赛德克·巴莱(上)	Seediq Bale: The Rainbow Warriors	魏德圣	林庆台、马志翔、安藤政信	https://upload.wikimedia.org/wikipedia/zh/e/e4/%E8%B3%BD%E5%BE%B7%E5%85%8B%C2%B7%E5%B7%B4%E8%90%8A%E9%9B%BB%E5%BD%B1%E6%B5%B7%E5%A0%B1.jpg	144
2025	219	2025-12-12	浪花朵朵		马鲁剑	张芷晴、欧阳卫熹
2025	220	2025-12-12	雪域使命		牛中明	姚刚、郭广平、黄俊鹏、金巧巧
2025	221	2025-12-12	中华白海豚	Chinese White Dolphin	闫东	纪录片
2025	222	2025-12-13	赛德克·巴莱(下)	Seediq Bale: The Rainbow Warriors	魏德圣	林庆台、马志翔、安藤政信	https://upload.wikimedia.org/wikipedia/zh/e/e4/%E8%B3%BD%E5%BE%B7%E5%85%8B%C2%B7%E5%B7%B4%E8%90%8A%E9%9B%BB%E5%BD%B1%E6%B5%B7%E5%A0%B1.jpg	144
2025	223	2025-12-16	岁岁平安	The Lost Daughter	臧连荣、许若谷	刘威葳、段奥娟
2025	224	2025-12-16	遥远的普若岗日	Puruo Gangri	赵汉唐、蔡宇	唐诗逸、阿旺仁青、旺卓措、韩文亮、佟丽娅、林永健
2025	225	2025-12-21	西门鸡角弄		赵翀	张铎、孙茜
2025	226	2025-12-23	再团圆	To Love Again	高临阳	李雪健、宋晓英、毕彦君、廖学秋、梁静
2025	227	2025-12-24	天堂附近		廖亮	余优、冯俊豪
2025	228	2025-12-24	鱼刺	Fish Bone	张旭煜	黄婧仪、柴烨、陈佳宁
2025	229	2025-12-25	逆转上半场	Pass and Goal	黄柏基	梁咏琪、陈湛文、凌文龙、梁雍婷	https://upload.wikimedia.org/wikipedia/zh/4/43/%E9%80%86%E8%BD%89%E4%B8%8A%E5%8D%8A%E5%A0%B4.jpeg	104
2025	230	2025-12-26	207B		张罗平	李梦、纪凌尘
2025	231	2025-12-27	情圣3	Love is Hard	董旭	肖央、谭卓、乔杉、常远、张小婉、代乐乐、艾伦、范湉湉、小沈阳、王迅
2025	232	2025-12-27	点到为止	Enough Is Enough	张玄鹏	尹正、潘斌龙、黄才伦、张一鸣、魏翔、彭昱畅
2025	233	2025-12-31	寻秦记	Back to the Past	吴炫辉、黎震龙	古天乐、林峯、宣萱、郭羡妮、滕丽名、郑雪儿、张继聪	https://upload.wikimedia.org/wikipedia/zh/4/41/%E5%B0%8B%E7%A7%A6%E8%A8%98%E9%9B%BB%E5%BD%B1%E7%89%88.jpeg	107
2025	234	2025-12-31	用武之地	Escape From The Outland	申奥	肖央、齐溪、任达华、郑恺	https://upload.wikimedia.org/wikipedia/zh/c/c3/%E7%94%A8%E6%AD%A6%E4%B9%8B%E5%9C%B0%E7%94%B5%E5%BD%B1%E6%B5%B7%E6%8A%A5.png	131
2025	235	2025-12-31	匿杀	The Fire Raven	柯汶利	彭昱畅、张钧甯、王迅、黄晓明、徐娇、邢佳栋、阿如那		116
2025	236	2025-12-31	他年她日	Measure in Love	龚兆平	许光汉、袁澧林	https://upload.wikimedia.org/wikipedia/zh/a/a6/Measure_in_Love.jpg	112
2025	237	2025-12-31	星际变种	Variant	李麒麟	刘敬宇、杨舒婷
2024	001	2024-01-05	寒单	Han Dan	黄朝亮	郑人硕、胡宇威、黄瀞怡、林予晞、杨贵媚		125
2024	002	2024-01-06	天降大任		宇宙之铁	动画片
2024	003	2024-01-09	皮壳之下	Under the Skin	吴永	江峰、曾晨、苏强、周军
2024	004	2024-01-11	回西藏	Kong and Jigme	陈国星、拉华加	宋洋、金巴、陶海、索朗旺姆
2024	005	2024-01-12	夜幕将至	Night Falls	菅浩栋	梁戟、佐菲
2024	006	2024-01-12	极限奇援	Extreme Save	雪村、俞晴	雪村、俞晴、黄圣依、魏晨 、王千源 、林永健、包贝尔	https://upload.wikimedia.org/wikipedia/zh/a/a2/Extreme_Save_poster.webp	97
2024	007	2024-01-12	你的约定	Your Agreement	丁伟	高旻睿
2024	008	2024-01-12	动物园里有什么？		安小满	包贝尔、宋晓峰、潘斌龙、贾冰 、魏翔、常远、王千源		96
2024	009	2024-01-12	大雨	The Storm	不思凡	动画片
2024	010	2024-01-13	烟火人间	This is Life	孙虹	纪录片
2024	011	2024-01-13	秦淮河边一间房	A Room by the Qinhuai River	冯华	纪录片
2024	012	2024-01-18	破冰少年	Skating Boy	姚瑞、李宏	褚嘉辉、董崇华
2024	013	2024-01-19	临时劫案	Rob N Roll	麦启光	郭富城、林家栋、任贤齐、张可颐、林雪、卢海鹏、梁仲恒、鲍起静	https://upload.wikimedia.org/wikipedia/zh/c/c0/%E8%87%A8%E6%99%82%E5%8A%AB%E6%A1%88.jpg	98
2024	014	2024-01-19	青春梦幻之穷小子的幸福	YOUTH DREAM OF THE HAPPINESS OF POOR BOY	陈勇	罗京民、曹雷
2024	015	2024-01-19	生命如花爱如蜜	Tonghua Girl	冯胜杰	田渤、梁梦一、权利群
2024	016	2024-01-20	花千骨		张超理	陈都灵、李程彬、茅子俊、赖美云、张紫宁、徐沐婵、陈晓东、张俪、汪汐潮	https://upload.wikimedia.org/wikipedia/zh/b/b6/The_Journey_of_Flower_film.webp	97
2024	017	2024-01-20	江豚·风时舞	Dance With the Finless Promise	陈曦、陈伟健	动画片
2024	018	2024-01-20	误闯隐形岛	Invisible Island	江辰子	动画片
2024	019	2024-01-26	出门在外	Give Me A Ride	范超、陈一孜	包贝尔、李梦、杨皓宇、何蓝逗
2024	020	2024-01-31	乌蒙奇缘		周德新	来喜、熊玉婷、李嘉铭
2024	021	2024-02-10	第二十条		张艺谋	雷佳音、马丽、赵丽颖、高叶、刘耀文、张译、于和伟、孙艺洲、潘斌龙	https://upload.wikimedia.org/wikipedia/zh/4/48/Article_20_poster.jpg	141
2024	022	2024-02-10	飞驰人生2	Pegasus 2	韩寒	沈腾、尹正、张本煜、范丞丞、孙艺洲	https://upload.wikimedia.org/wikipedia/zh/f/f9/Pegasus_2_poster.jpg	121
2024	023	2024-02-10	热辣滚烫		贾玲	贾玲、雷佳音、李雪琴、张小斐、乔杉、杨紫	https://upload.wikimedia.org/wikipedia/zh/2/2f/YOLO_poster.jpg	129
2024	024	2024-02-10	熊出没·逆转时空		林汇达	动画片	https://upload.wikimedia.org/wikipedia/zh/2/2c/Boonie_Bears_Time_Twist_poster.jpg	108
2024	025	2024-02-10	八戒之天蓬下界	Ba Jie	何冉昊	动画片
2024	026	2024-02-10	黄貔：天降财神猫	God of Money	白丁、关杨	动画片
2024	027	2024-02-16	破战	Break War	彭发	吴镇宇、任达华、程媛媛、唐文龙	https://upload.wikimedia.org/wikipedia/zh/0/08/%E9%9B%BB%E5%BD%B1%E3%80%8A%E7%A0%B4%E6%88%B0%E3%80%8B.jpg	86
2024	028	2024-02-24	还是觉得你最好2	Table for Six 2	陈咏燊	邓丽欣、张继聪、王菀之、林明祯、陈湛文、谢君豪	https://upload.wikimedia.org/wikipedia/zh/7/72/%E9%A3%AF%E6%88%B2%E6%94%BB%E5%BF%832.jpg	132
2024	029	2024-03-01	周处除三害	The Pig, the Snake, and the Pigeon	黄精甫	阮经天、袁富华、陈以文、王净、李李仁、谢琼煖、陈秉佑、曾珮瑜	https://upload.wikimedia.org/wikipedia/zh/c/cd/%E5%91%A8%E8%99%95%E9%99%A4%E4%B8%89%E5%AE%B3_%28%E9%9B%BB%E5%BD%B1%29.jpg	134
2024	030	2024-03-01	午夜6号房	Room 6 at Midnight	关焙元	魏小欢、王忠浩、马玥、洛桑义西
2024	031	2024-03-02	戏杀	The Killing Performance	牛朝阳	贾冰、喻恩泰、蒋梦婕、刘桦、李倩
2024	032	2024-03-02	陌路狂刀	The Wild Blade of Strangers	李伟	张晋、耿乐、夏梦、蒋璐霞、刘桦、冯雷
2024	033	2024-03-08	被我弄丢的你	I Miss You	韩琰	檀健次、张婧仪、蒋龙
2024	034	2024-03-08	孔秀	A Woman	王超	沈诗雨、朱栋青、王学东
2024	035	2024-03-08	追月	Off the Stage	乔梁	何赛飞、袁文康、娄宇健
2024	036	2024-03-08	因你而动	Butterfly Lovers	孙小茹	于潇爽、郭喆、荣蓉、雷汉、李泗元
2024	037	2024-03-14	绝地重生	Turning Point	邱怀阳、聂军	王斑、侯祥玲
2024	038	2024-03-15	灿烂的她	Remember Me	徐伟	惠英红、刘浩存、张子贤、苇青、鄂靖文、荣梓杉、余皑磊
2024	039	2024-03-15	古堡守灵人	Search for the Vengeance	张琪东	沈文俊、何艺林
2024	040	2024-03-15	红毯先生	The Movie Emperor	宁浩	刘德华、单立文、瑞玛·席丹、余伟国、宁浩、林熙蕾、梁家辉、杨千嬅、王晶、张子贤	https://upload.wikimedia.org/wikipedia/zh/9/9b/The_Movie_Emperor_poster.jpg	127
2024	041	2024-03-16	生死赛车	Red Line	柯有谦	瘦子、陈嘉桦、柯有伦	https://upload.wikimedia.org/wikipedia/zh/0/0f/%E9%80%9F%E5%91%BD%E9%81%93.jpeg	99
2024	042	2024-03-16	阿莫阿依	When We Bloom	苗月	耍惹阿佳、曲别阿伍、啥妈石古、阿史尔罗
2024	043	2024-03-16	幸福核桃	The Walnuts of Felicity	曾艳、郑焱垚	孙迅、曾曾、袁利国
2024	044	2024-03-22	堡垒	Special Party Branch	韩可一	陈明昊、郭晓东、李一桐、陈都灵、景岗山、宋宁峰、田原、薛皓文、是安
2024	045	2024-03-22	贞胜		林秀强	杨清
2024	046	2024-03-22	青檀	Qingtan	柳珂	陈奕名、冯萌梦、郝劭文
2024	047	2024-03-30	银河写手	Galaxy Writer	李阔、单丹丹	宋木子、合文俊
2024	048	2024-03-30	我们一起摇太阳	Viva La Vida	韩延	彭昱畅、李庚希、徐帆、高亚麟、李晨、王迅
2024	049	2024-04-03	黄雀在后！	The Victims	徐伟、何文超	冯绍峰、陶虹、黄觉、张海宇、黄梦莹、涂松岩
2024	050	2024-04-03	草木人间	Dwelling by the West Lake	顾晓刚	吴磊、蒋勤勤、陈建斌、王佳佳
2024	051	2024-04-03	雪豹	Snow Leopard	万玛才旦	金巴、熊梓淇
2024	052	2024-04-03	零度极限	Snow Dance	叶伟民	韩庚、尹昉、郎月婷、颜卓灵、吴京、李晨、姜武、丁海峰、石兆琪
2024	053	2024-04-04	大“反”派	Super Villain	包贝尔	包贝尔、李嘉琦、周大勇、克拉拉
2024	054	2024-04-04	午夜怪谈	Midnight Radio	汪英杰	游乐儿、于珂然、任浩瑜
2024	055	2024-04-09	幸福慢车	Happiness Railway	李亚东	张宸汐、黄昊月
2024	056	2024-04-12	白日之下	In Broad Daylight	简君晋	姜大卫、余香凝、林保怡、梁仲恒、陈湛文	https://upload.wikimedia.org/wikipedia/zh/4/45/%E7%99%BD%E6%97%A5%E4%B9%8B%E4%B8%8B.jpg	106
2024	057	2024-04-12	乘船而去	Gone with the Boat	陈小雨	葛兆美、刘丹、吴洲凯、周琳
2024	058	2024-04-12	出门在外	Give Me A Ride	范超、陈一孜	包贝尔、李梦、何蓝逗
2024	059	2024-04-12	有你真好！	Battle	刘迪洋	郝蕾、马苏
2024	060	2024-04-12	来自汪星的你	Woof Woof Daddy	陆可	郭富城、蓝盈莹、王大陆、黄龄	https://upload.wikimedia.org/wikipedia/zh/9/95/%E4%BE%86%E8%87%AA%E6%B1%AA%E6%98%9F%E7%9A%84%E4%BD%A0.jpg	105
2024	061	2024-04-12	陨石江湖：天降20亿	Chasing A Shooting Star	郭海涛	师清峰、唐小然、褚丰铭、张志勇
2024	062	2024-04-18	我要当老师		洪宝生	王润泽、原雨、李建义、林永健、梁爱琪、沈丹萍、唐国强、果靖霖、岳云鹏
2024	063	2024-04-19	年少日记	Time Still Turns the Pages	卓亦谦	卢镇业、郑中基、黄梓乐、韦罗莎、陈汉娜	https://upload.wikimedia.org/wikipedia/zh/3/3c/%E5%B9%B4%E5%B0%91%E6%97%A5%E8%A8%982023.jpg	95
2024	064	2024-04-19	童話·世界	Fantasy ‧ World	唐福睿	张孝全、李康生、江宜蓉、尹馨、夏于乔	https://upload.wikimedia.org/wikipedia/zh/0/02/%E7%AB%A5%E8%A9%B1%E3%83%BB%E4%B8%96%E7%95%8C.jpg	110
2024	065	2024-04-19	抗战中的文艺	Another Day of Hope	田沁鑫	田雨、李光洁、关晓彤、王楷勝、辛柏青、秦海璐、孙红雷、段奕宏、刘烨、陈建斌、廖凡、张艺兴、罗一舟、朱颜曼滋、吴谨言
2024	066	2024-04-19	再见土拨鼠	Goodbye The Groundhog	杨程成	杨程成、索南拉丹
2024	067	2024-04-19	中国车手周冠宇	The First One	沈建平	纪录片
2024	068	2024-04-20	重山之外		刘子钦、李春啸	司马南、简宇熙、冯波、高亚麟
2024	069	2024-04-20	屋顶足球	Football on the Roof	飞鱼	唐良凤、谭新宇
2024	070	2024-04-21	疯狂绑架		张冰寒	杜奕衡、钟祺
2024	071	2024-05-01	维和防暴队	Formed Police Unit	李达超	黄景瑜、王一博、钟楚曦、欧豪、朱亚文、谷嘉诚	https://upload.wikimedia.org/wikipedia/zh/d/dc/%E7%BB%B4%E5%92%8C%E9%98%B2%E6%9A%B4%E9%98%9F.png	101
2024	072	2024-05-01	没有一顿火锅解决不了的事	Nothing Can't Be Undone by a HotPot	丁晟	杨幂、于谦、田雨、余皑磊、李九霄、黄小蕾
2024	073	2024-05-01	九龙城寨之围城	Twilight of the Warriors: Walled In	郑保瑞	古天乐、洪金宝、任贤齐、林峯、刘俊谦、黄德斌、伍允龙、胡子彤、张文杰、廖子妤	https://upload.wikimedia.org/wikipedia/zh/2/28/Kowloon_Walled_City_Movie.jpg	126
2024	074	2024-05-01	穿过月亮的旅行	I Love You to the Moon and Back	李蔚然	张子枫、胡先煦、黄小蕾、赵小棠、袁文康、陈妍希、吴宣仪、李嘉琦、冯绍峰、李晨、王影璐、吴昊宸
2024	075	2024-05-01	末路狂花钱	The Last Frenzy	乌日娜	贾冰、谭卓、小沈阳
2024	076	2024-05-01	猪猪侠大电影·星际行动			动画片
2024	077	2024-05-08	妈妈和七天的时间	Mama	李冬梅
2024	078	2024-05-11	碧血黎明	Dawn Sprinkled with Blood	生凯	叶沛、甘霖、胡原君、宋沐心
2024	079	2024-05-17	彷徨之刃	Hovering Blade	陈卓	王千源、王景春、齐溪、张宥浩、王天辰
2024	080	2024-05-17	朝云暮雨	Strangers When We Meet	张国立	范伟、周冬雨、宋佳、毛孩、范湉湉	https://upload.wikimedia.org/wikipedia/zh/a/a8/Strangers_When_We_Meet_2024.jpg	108
2024	081	2024-05-17	红色冲浪板	Labyrinth	马雪	许伟豪、黄炎、王悦伊、李康生、边程
2024	082	2024-05-17	云雾女孩	Lost Girl	丁叮	商忆莎、文晴
2024	083	2024-05-17	你就在我身边		高锐	李汶翰、鹤男、段晓薇
2024	084	2024-05-18	替身纸人2	Paper Man2	徐俊	何雨宸、任子豪
2024	085	2024-05-19	错过你的那些年	18×2 Beyond Youthful Days	藤井道人	许光汉、清原果耶、道枝骏佑	https://upload.wikimedia.org/wikipedia/zh/1/13/18%C3%972_Beyond_Youthful_Days.jpeg	124
2024	086	2024-05-20	你是我的英雄	You are My Hero	范元	陈永胜、林博洋、邵兵、丁柳元、刘佩琦
2024	087	2024-05-21	最后的，最初的	Being Mortal	罗率	纪录片
2024	088	2024-05-24	三叉戟	Three Old Boys	高群书	黄志忠、姜武、郭涛、欧豪、韩庚、董勇、金士杰、魏晨、邢佳栋、包贝尔、黄璐、陈都灵、赵子琪、何杜娟、黄小蕾
2024	089	2024-05-24	发小儿万岁	Long Live Friendship	高炜、安佳星	高炜、林源 、曹思方、李勤勤
2024	090	2024-05-24	六号银像	The No.6 Statue	李墨言	张桐、陈创
2024	091	2024-05-24	再会长江	The Yangtze River	竹内亮	纪录片
2024	092	2024-05-25	朱同在三年级丢失了超能力	Day Dreaming	王子川	岳昊、马千壹、徐艺瑄、方东海、王浩宇、张航诚、王珞丹、金世佳、张本煜、李勤勤、饶晓志、黄小蕾	https://upload.wikimedia.org/wikipedia/zh/7/75/%E6%9C%B1%E5%90%8C%E5%9C%A8%E4%B8%89%E5%B9%B4%E7%BA%A7%E4%B8%A2%E5%A4%B1%E4%BA%86%E8%B6%85%E8%83%BD%E5%8A%9B.png	98
2024	093	2024-05-25	带彩球的帐篷	The Flower's Time	刘苗苗	莫西子诗
2024	094	2024-05-28	我就是风	Be Brave	邓原、潘钧	张家城、周楚濋
2024	095	2024-05-31	乜代宗师	The Grand Grandmaster	黄子华	黄子华、刘心悠	https://upload.wikimedia.org/wikipedia/zh/5/53/%E4%B9%9C%E4%BB%A3%E5%AE%97%E5%B8%AB2020.jpeg	118
2024	096	2024-06-01	潜艇总动员：寻龙	Happylittle Submarine：The Adventure with Dragon		动画片
2024	097	2024-06-07	日夜江河	Karma	郑培科	廖禹沣、邹涛、冯家妹
2024	098	2024-06-07	梦想之地		周涛	周小鹏、袁秀芝、周亚萍
2024	099	2024-06-08	走走停停	Gold or Shit	龙飞	胡歌、高圆圆	https://upload.wikimedia.org/wikipedia/zh/a/a7/Gold_or_shit.jpg	103
2024	100	2024-06-08	扫黑·决不放弃	No Zuo No Die	五百	肖央、余皑磊、范丞丞、林乐炫、李诚儒、耿乐、杨皓宇、石兆琪、李建义
2024	101	2024-06-08	我才不要和你做朋友呢	Be Friend My Mom	何念	庄达菲、陈昊宇、王皓、毕雯珺、贾冰、牛莉、车保罗、董思怡、万国鹏	https://upload.wikimedia.org/wikipedia/zh/0/05/Be_My_Friend_2024_film_poster.jpg	114
2024	102	2024-06-08	谈判专家	Crisis Negotiators	邱礼涛	刘青云、吴镇宇、苗侨伟、姜皓文、彭秀慧、周文健、颜卓灵、杨伟伦、郑则仕	https://upload.wikimedia.org/wikipedia/zh/d/d3/Crisis_Negotiators_poster.jpg	120
2024	103	2024-06-08	离伤记	Hurt of Separate	黄宗奖	徐小琴、高维华、于不凡、刘杰
2024	104	2024-06-14	陌路惊魂	Dangerous Road	靪文	张晓锋、王柯词、刘远锋
2024	105	2024-06-15	狗阵	Black Dog	管虎	彭于晏、佟丽娅、贾樟柯、张译	https://upload.wikimedia.org/wikipedia/zh/d/d1/Black_Dog_2024_film_poster.jpg	106
2024	106	2024-06-15	一片绿洲	An Oasis	高小卫	马少骅、王新中、梁丽梁丽
2024	107	2024-06-15	来日皆方长	The Coming Days	郭柯	王彩平、陈依莎
2024	108	2024-06-15	爸爸是外星人	My Dad is an Alien	任钊萱	贾冰、左小青、杜志国、苗圃、范明
2024	109	2024-06-16	屋檐下		黎榞	罗德元、税建华
2024	110	2024-06-17	没有颜色的关系	With or Without You	冯逸	郑静茹、牙渔、阎三元
2024	111	2024-06-18	永不消逝的电波	Red Radio Over Shanghai	郑大圣	王佳俊、朱洁静、邓韵
2024	112	2024-06-21	沙漏	Reversed Destiny	温婧	邱天、包上恩、黄明昊
2024	113	2024-06-21	唤醒者	Awakener	刘耿维	宣言、姜寒、杜雨宸
2024	114	2024-06-21	惊心妒怨	Jealousy	蔡翱骏	蔡翱骏
2024	115	2024-06-21	惊心妒怨	Jealousy	蔡翱骏	蔡翱骏、马卷卷
2024	116	2024-06-22	云边有个小卖部	Moments We Shared	张嘉佳	彭昱畅、周也、张艺凡、陈妍希、王大陆、赵露思、艾丽娅	https://upload.wikimedia.org/wikipedia/zh/4/43/Moments_We_Shared_2024_film_poster.jpg	131
2024	117	2024-06-28	来福大酒店	Life Hotel	刘博文	黄轩、柳岩、张哲华、董宝石、徐小飒	https://upload.wikimedia.org/wikipedia/zh/a/a5/Life_Hotel_2024_film_poster.jpg	118
2024	118	2024-06-28	海关战线	Customs Frontline	邱礼涛	张学友、谢霆锋、林嘉欣、刘雅瑟、吴镇宇	https://upload.wikimedia.org/wikipedia/zh/8/82/CustomsFrontline.jpg	115
2024	119	2024-06-28	江海儿女	Jianghai's Heroic Sons and Daughters	秦飞、向子、朱晓杰	赵伯松、任祐萱、沈保平
2024	120	2024-07-01	出发	The Beginning	刘智海	罗泽楷、陈韦欣、莫小奇
2024	121	2024-07-03	默杀	A Place Called Silence	柯汶利	王传君、张钧甯、吴镇宇、王圣迪、蔡明、金士杰、黄明昊、徐娇	https://upload.wikimedia.org/wikipedia/zh/5/58/A_Place_Called_Silence_2024_film_poster.jpg	119
2024	122	2024-07-05	欢迎来到我身边	Welcome to My Side	宋灏霖	于适、王影璐	https://upload.wikimedia.org/wikipedia/zh/c/c2/Welcome_to_My_Side_2024_film_poster.jpg	102
2024	123	2024-07-05	谯国夫人		萧锋	曾小敏、文汝清
2024	124	2024-07-05	新大头儿子和小头爸爸6：迷你大冒险	New Happy Dad and Son 6: Shrunk	刘可欣	动画片
2024	125	2024-07-06	伞少女	The Umbrella Fairy	沈杰	动画片		95
2024	126	2024-07-09	巧克力和酥油花	Chocolate and Butter Sculpture	陈颖心	孟滚、赵子毅、车永莉、黄俊鹏
2024	127	2024-07-10	传说	A Legend	唐季礼	成龙、张艺兴、古力娜扎、李治廷、李晨、彭小苒、窦骁、郑业成、金喜善
2024	128	2024-07-12	落凡尘	Fall Into The Mortal World	钟鼎	动画片
2024	129	2024-07-13	二郎神之深海蛟龙	God with Three Eyes	王君	动画片
2024	130	2024-07-14	寻秘自然：地球往事	Seek Out Natural Mysteries	汪诘	纪录片
2024	131	2024-07-16	抓娃娃	Successor	闫非、彭大魔	沈腾、马丽、萨日娜、史彭元、张子栋、贾冰	https://upload.wikimedia.org/wikipedia/zh/1/1f/Successor_2024_film_poster.jpg	133
2024	132	2024-07-19	喜羊羊与灰太狼之守护		黄俊铭、陈力进	动画片		96
2024	133	2024-07-21	寻秘自然：无形之力	Seek Out Natural Mysteries	汪诘	纪录片
2024	134	2024-07-26	异人之下	Under One Person	乌尔善、夏鹏	胡先煦、李宛妲、冯绍峰、娜然、兰西雅、乔振宇、宋宁峰、王劲松、隋咏良	https://upload.wikimedia.org/wikipedia/zh/2/2f/%E7%94%B5%E5%BD%B1%E5%BC%82%E4%BA%BA%E4%B9%8B%E4%B8%8B%E6%B5%B7%E6%8A%A5.jpg	134
2024	135	2024-08-01	一生交给党	A Life of Loyalty	陶明喜	王超伟、莫小奇		90
2024	136	2024-08-02	从21世纪安全撤离	Evacuate from the 21st Century	李阳	张若昀、钟楚曦、宋洋、朱颜曼滋、李晨浩、温峥嵘	https://upload.wikimedia.org/wikipedia/zh/b/b6/Evacuate_from_the_21st_Century_2024_film_poster.jpg	98
2024	137	2024-08-03	解密		陈思诚	刘昊然、约翰·库萨克、陈道明、吴彦祖、俞飞鸿、任璐遥、陈雨锶、王雨甜、周游、朱珠	https://upload.wikimedia.org/wikipedia/zh/4/44/Decoded_2024_film_poster.jpg	156
2024	138	2024-08-03	校园神探	Schoolyard Sleuth	于飞	林子烨、洪悦熙、裴佳欣、陈芷琰、张婉儿
2024	139	2024-08-03	我们永远是我们	We Are Forever	夏孟	米咪、陈昕葳、姚弛
2024	140	2024-08-08	一和多	One or More	周洪波	纪录片
2024	141	2024-08-09	逆行人生	Upstream	徐峥	徐峥、辛芷蕾、王骁、贾冰、刘美含、丁勇岱、丁嘉丽、黄小蕾	https://upload.wikimedia.org/wikipedia/zh/e/eb/Upstream_2024_film_poster.webp	121
2024	142	2024-08-09	如果爱就表白	If You Love Express It	高峰	阿丽玛、王智、马灿灿、张国强
2024	143	2024-08-10	加班惊魂	Overtime Frightened	丁大海	鲍李宁、孙琰清
2024	144	2024-08-10	负负得正	Land of Broken Hearts	温仕培	朱一龙、邱天、蒋奇明、朱珠
2024	145	2024-08-10	白蛇：浮生	White Snake: Afloat	陈健喜、李佳锴	动画片	https://upload.wikimedia.org/wikipedia/zh/b/ba/White_Snake_Afloat_poster.jpg	133
2024	146	2024-08-13	浪漫的断章	A Romantic Fragment	杨平道	班玛加、王歆霆、魏军
2024	147	2024-08-16	重生	Go for Broke	马浴柯	张家辉、阮经天、张榕容、马浴柯、陈国坤、张俪、高捷	https://upload.wikimedia.org/wikipedia/zh/2/2d/%E3%80%8A%E9%87%8D%E7%94%9F%E3%80%8B%E9%9B%BB%E5%BD%B1%E6%B5%B7%E5%A0%B1.jpg	115
2024	148	2024-08-16	我想和你在一起	Love Beside Me	蔡旻桦、胡皓翔	林映彤、黄宏轩、涂善存、席惟伦
2024	149	2024-08-16	红楼梦之金玉良缘	The Dream of the Red Chamber	胡玫	林鹏、卢燕、边程、张淼怡 、黄佳容、关晓彤、王斑、苑琼丹、罗海琼、杨童舒、丁嘉丽
2024	150	2024-08-16	又是充满希望的一天	Another Day of Hope	刘泰风	宋宁峰、张歆艺、郭柯宇、孙之鸿
2024	151	2024-08-16	怯懦的勇气	Cowardly Courage	殷玉洲	薛闻君、李捷沁
2024	152	2024-08-17	阿狸	Ali's Dream Castle	徐瀚	动画片	https://upload.wikimedia.org/wikipedia/zh/b/b5/Ali%27_s_Dream_Castle_Promo_Screencap.jpg
2024	153	2024-08-23	金腰带	The Golden Belt	王光利	姚橹
2024	154	2024-08-23	假如，我是这世上最爱你的人	Till Love Do Us Apart	刘奋斗	佟丽娅、黄明昊	https://upload.wikimedia.org/wikipedia/zh/2/20/Till_Love_Do_Us_Apart_2024_film_poster.jpg	113
2024	155	2024-08-23	刺猬	The Hedgehog	顾长卫	葛优、王俊凯、刘威葳、耿乐、张本煜、范明、王自健、任素汐、刘雅瑟	https://upload.wikimedia.org/wikipedia/zh/4/49/The_Hedgehog_2024_film.jpg	103
2024	156	2024-08-23	逆鳞	Untouchable	大庆	沈腾、张雨绮、高捷、蔡文静
2024	157	2024-08-24	倒仓	The Midsummer's Voice	张裕笛	边程、周美君
2024	158	2024-08-24	金陵御猫	The Royal Cat	曹梁	动画片
2024	159	2024-08-27	人海同游	Borrowed Time	蔡杰	林冬萍、欧阳骏、潘结、孙阳、太保
2024	160	2024-08-31	何处生长	Growing Apart	龙凌云	尚语贤、岳骁恪、艾丽娅
2024	161	2024-08-31	密语者	Hidden Letters	冯都、赵青	纪录片
2024	162	2024-09-03	金色少年		傅澍坤	李庆誉、张立
2024	163	2024-09-05	奔跑吧，麋鹿	Running Milu Deer	金宜鸿、郭劲锋	郑颖娴、陈雅斓
2024	164	2024-09-06	万物三生	Three Wishes	翁羽	梦秦、侯佛明、张凯元
2024	165	2024-09-06	里斯本丸沉没	The Sinking of the Lisbon Maru	方励	纪录片	https://upload.wikimedia.org/wikipedia/zh/c/cc/The_Sinking_of_the_Lisbon_Maru.jpg	123
2024	166	2024-09-07	9号传奇		朱敏江	白恩、马虎、姚星彤
2024	167	2024-09-07	脑洞大开		唐滔	何欢、王迅、克拉拉、九孔
2024	168	2024-09-07	闪耀少年之空中接力	AllEY-OOP	巨兴茂	夏浩然、巍子
2024	169	2024-09-10	一代人师严修		洪宝生	李建新、杨静、万宾
2024	170	2024-09-10	与孩子一同成长	Grow Up With Children	臧伟	易莉、穆梦娇、幸封燚
2024	171	2024-09-10	慧能前传	The Wisdom of the Master	李济德	林江国、汤镇宗、徐少强
2024	172	2024-09-13	野孩子	Stand By Me	殷若昕	王俊凯、邓家佳	https://upload.wikimedia.org/wikipedia/zh/f/fb/Stand_By_Me_2024_film_poster.jpg	127
2024	173	2024-09-13	乡见未晚	Not Too Late to Meet	李艺文	廖梦妍、王伟波、王浩沣
2024	174	2024-09-14	最后的心事	Last Wish	龚洵	姚未平、杨媛之
2024	175	2024-09-15	出走的决心	Like A Rolling Stone	尹丽川	咏梅、姜武、吴倩、张本煜、马苏、艾丽娅	https://upload.wikimedia.org/wikipedia/zh/f/f2/Like_a_Rolling_Stone.jpg	106
2024	176	2024-09-15	全员嫌疑人	All Suspects	傅鸫	小沈阳、秦海璐、王紫逸、曹恩齐
2024	177	2024-09-15	大场面	Keep Rolling	李季	王天放、马旭东、管乐
2024	178	2024-09-15	祝你幸福！	Enjoy yourself	康博	肖央、宋佳、倪大红、吴越、吴玉芳、周依然、丁嘉丽
2024	179	2024-09-15	一雪前耻	A Frozen Rage	于广义、于秋石	乔杉、马丽、包贝尔、赵龙豪、周大勇、潘斌龙、修睿、艾丽娅
2024	180	2024-09-15	西施新传		代艺霖	曹曦月、应昊茗 、罗立群、赵樱子、刘锡明
2024	181	2024-09-15	江南：在爱开始的地方等你	Jiang Nan	康锐	赖雨濛、刘冬沁、金巧巧、苇青
2024	182	2024-09-15	流浪地球2：再次冒险	Inside the Wandering Earth Ⅱ	郭思文	纪录片
2024	183	2024-09-15	大圣降妖	The Monkey King Conquers Monsters	吴海涛	动画片
2024	184	2024-09-15	奇妙萌可大电影	The Perfect Match	何佩祺	动画片
2024	185	2024-09-15	森林飞侠	Hero in Forest	张国超	动画片
2024	186	2024-09-19	长寿花		王军	于非非、王鹤龙
2024	187	2024-09-20	车库	Garage	肖峰、杨鹤	曾芒、丁雅、江吉妍
2024	188	2024-09-20	看不见的朋友	Hello Ghost!	谢沛如	曾敬骅、邵雨薇		104
2024	189	2024-09-20	门前宝地	100 Yards	徐浩峰、徐骏峰	向佐、郭碧婷、安志杰、唐诗逸、李媛
2024	190	2024-09-20	我的爷爷	My Grand Father	郑春雨	任达华、娄艺潇、赵燕国彰
2024	191	2024-09-21	富都青年	Abang Adik	王礼霖	吴慷仁、陈泽耀	https://upload.wikimedia.org/wikipedia/zh/2/20/%E5%AF%8C%E9%83%BD%E9%9D%92%E5%B9%B4%E6%AD%A3%E5%BC%8F%E6%B5%B7%E5%A0%B1.jpeg	115
2024	192	2024-09-21	时光记忆	Time Memory	赖杰	景研竣、泓萱
2024	193	2024-09-28	踢出个未来	Mountain Soccer Boy	刘宁	荆俊威、舒宣、吉阳
2024	194	2024-09-30	危机航线	High Forces	彭顺	刘德华、张子枫、屈楚萧、刘涛、郭晓东、蒋梦婕、王耀庆、姜超、王龙正	https://upload.wikimedia.org/wikipedia/zh/a/a8/High_Forces_poster.jpg	119
2024	195	2024-09-30	志愿军：存亡之战	The Volunteers: To the War 2	陈凯歌	朱一龙、辛柏青、张子枫、朱亚文、陈飞宇、王砚辉、肖央、吴京、张宥浩、欧豪、韩东君、郭晓东、任重、李乃文、聂远、唐曾、赫子铭、王阳	https://upload.wikimedia.org/wikipedia/zh/d/d1/%E5%BF%97%E9%A1%98%E8%BB%8D.%E5%AD%98%E4%BA%A1%E4%B9%8B%E6%88%B0.jpg	144
2024	196	2024-09-30	出入平安	Give You A Candy	刘江江	肖央、阿云嘎、古力娜扎、黄小蕾	https://upload.wikimedia.org/wikipedia/zh/7/78/%E5%87%BA%E5%85%A5%E5%B9%B3%E5%AE%89%E6%B5%B7%E6%8A%A5.png	134
2024	197	2024-10-01	749局		陆川	王俊凯、苗苗、郑恺、任敏、辛柏青、张钧甯、李晨、杨皓宇、余皑磊、李梦、金世佳、金世佳、李光洁、周一围、曹卫宇、李勤勤	https://upload.wikimedia.org/wikipedia/zh/a/a9/749%E5%B1%80%E9%9B%BB%E5%BD%B1%E6%B5%B7%E5%A0%B1.jpg	123
2024	198	2024-10-01	浴火之路	Tiger Wolf Rabbit	五百	肖央、赵丽颖、刘烨、冯德伦、潘斌龙、王迅、陈明昊、徐冬冬、印小天、艾丽娅	https://upload.wikimedia.org/wikipedia/zh/0/09/%E6%B5%B4%E7%81%AB%E4%B9%8B%E8%B7%AF%E6%B5%B7%E6%8A%A5.png	126
2024	199	2024-10-01	爆款好人	The Hutong Cowboy	宁浩、徐磊	葛优、李雪琴、杨皓宇、刘敏涛、吴磊、贾冰、龚蓓苾、张子贤、雷佳音、郭麒麟	https://upload.wikimedia.org/wikipedia/zh/9/98/The_Hutong_Cowboy.jpg	113
2024	200	2024-10-01	熊猫计划	Panda Plan	张栾	成龙、魏翔	https://upload.wikimedia.org/wikipedia/zh/d/d8/%E9%9B%BB%E5%BD%B1%E7%86%8A%E7%8C%AB%E8%AE%A1%E5%88%92%E6%B5%B7%E5%A0%B1.jpg	99
2024	201	2024-10-01	只此青绿	A Tapestry of a Legendary Land	周莉亚、韩真	张翰、孟庆旸、谢素豪	https://upload.wikimedia.org/wikipedia/zh/0/05/%E5%8F%AA%E6%AD%A4%E9%9D%92%E7%BB%BF%E7%94%B5%E5%BD%B1%E6%B5%B7%E6%8A%A5.jpg	89
2024	202	2024-10-01	新大头儿子和小头爸爸6：迷你大冒险		刘可欣	动画片
2024	203	2024-10-01	皮皮鲁和鲁西西之309暗室		郑亚旗	动画片
2024	204	2024-10-12	绑架游戏	Welcome To The Game	张哲	彭昱畅、胡冰卿、姚橹
2024	205	2024-10-18	云上的云		李玉刚	吕星辰、梁永棋、李玉刚、艾丽娅
2024	206	2024-10-18	密室逃脱	Let Me Out	殷乐	王婷、姜志刚、何索、祁圣翰
2024	207	2024-10-18	沉默高原	The Highland Reflections	杨凡、陈波	谭阔阔、任山、茹天
2024	208	2024-10-19	816	Being is Gift	魏德圣	郑又菲、曾沛慈、陈博正、郭大睿、田中千绘	https://upload.wikimedia.org/wikipedia/zh/3/35/BIG_%282023%E5%B9%B4%E9%9B%BB%E5%BD%B1%29.jpg	158
2024	209	2024-10-20	光之子	Daughter of the Light	卡先加	纪录片
2024	210	2024-10-23	盐湖计划	Saline Lake Project	陆磊	吴镇宇、许君聪、盛冠森、关雪盈
2024	211	2024-10-25	冲撞	Body Contact	盛志民	杨梓航、张文瀚、杨之楹
2024	212	2024-10-26	乔妍的心事	The Unseen Sister	赵德胤	赵丽颖、辛芷蕾、黄觉、董宝石	https://upload.wikimedia.org/wikipedia/zh/c/c4/The_Unseen_Sister_2024_film_poster.jpg	112
2024	213	2024-10-31	鸳鸯楼·惊魂			李梦、苏小玎、刘迅、海陆、赵樱子
2024	214	2024-11-01	老枪	A Long Shot	高朋	祖峰、秦海璐、周政杰、冯雷、邵兵
2024	215	2024-11-01	焚城	Cesium Fallout	潘耀明	刘德华、白宇、莫文蔚、谢君豪、王菀之、王丹妮、廖子妤、王敏德 、林保怡、郑则仕、黄德斌、黄恺杰、吴彦姝、童瑶、周文健	https://upload.wikimedia.org/wikipedia/zh/5/53/%E7%84%9A%E5%9F%8E2024.jpg	138
2024	216	2024-11-01	爱你很久很久	I Am the Secret in Your Heart	赖孟杰	李沐、曹佑宁、娄峻硕、林美秀
2024	217	2024-11-01	清道夫	The Guardian Of Kawaboge	倵泉	次里央宗、格茸、蔡子健
2024	218	2024-11-01	一竞到底	One Shot	杨帆	纪录片
2024	219	2024-11-05	女人世界	Chinatown Cha-Cha	杨圆圆	纪录片
2024	220	2024-11-08	夹缝之间	Shanghai Girls	郭大路	陶昕然、赵炳锐
2024	221	2024-11-08	上海少女	Within	罗彤
2024	222	2024-11-09	那个不为人知的故事	That Untold Story	张岩	邱泽、郎月婷、李孝谦、邢佳栋
2024	223	2024-11-11	单单	Dan Dan	宋川	楚布花羯、余薇薇、丁韶仪、魏小欢
2024	224	2024-11-15	我谈的那场恋爱	Love Lies	何妙祺	吴君如、张天赋、邓丽欣、陈辉虹、张锦程	https://upload.wikimedia.org/wikipedia/zh/a/a6/%E6%88%91%E8%AB%87%E7%9A%84%E9%82%A3%E5%A0%B4%E6%88%80%E6%84%9B.png	114
2024	225	2024-11-15	胜券在握	To Gather Around	刘循子墨	邓超、邓家佳、郑云龙、喻恩泰、李乃文、杨皓宇	https://upload.wikimedia.org/wikipedia/zh/7/75/Brave_New_World_2024_film_poster.jpg	135
2024	226	2024-11-15	古宅谜案	The Quadrangle Enigma	高健	贡米、郭秋成
2024	227	2024-11-16	戴假发的人	The Wig	董越	黄晓明、王影璐、黄璐、李倩
2024	228	2024-11-22	好东西	Her Story	邵艺辉	宋佳、钟楚曦、章宇、赵又廷、王菊、孔连顺	https://upload.wikimedia.org/wikipedia/zh/4/48/Her_Story.jpg	123
2024	229	2024-11-22	金钱堡垒	Money Bastion	彭发	王千源、冯绍峰、王丽坤、张俪、邵兵、鞠婧祎、陈国坤、石兆琪		93
2024	230	2024-11-22	风流一代	Caught by the Tides	贾樟柯	赵涛	https://upload.wikimedia.org/wikipedia/zh/e/eb/%E9%A3%8E%E6%B5%81%E4%B8%80%E4%BB%A3%E7%94%B5%E5%BD%B1%E6%B5%B7%E6%8A%A5.jpg	111
2024	231	2024-11-22	美人鱼的夏天	Mermaid Summer	沈晓阳	动画片	https://upload.wikimedia.org/wikipedia/zh/6/6b/Mermaid_Summer_poster.jpg	86
2024	232	2024-11-28	刮大风	The Lost Memory of the Loess Land	秦小鹏	柳强强、王小妮
2024	233	2024-11-29	大突围		杨真	任天野、敖子逸、艾米、王劲松、袁姗姗、黄小蕾、刘威、平田康之
2024	234	2024-11-29	噬魂岛	Dawn Break	魏冬雷	伍月、蔡鹏飞、万斯佳
2024	235	2024-11-29	陌路无期	Never Meet Again	吴鹏雄	张恒俞、陈汉典、吴以涵
2024	236	2024-11-29	戏	Dream Big	韩万峰	陈立唯、顾靖、陈端
2024	237	2024-11-30	热血燃烧	Burning Blood	魏冬雷	陈小春、谢天华、林晓峰、朱永棠、冯萌梦、秦沛	https://upload.wikimedia.org/wikipedia/zh/f/fb/%E9%9B%BB%E5%BD%B1%E7%86%B1%E8%A1%80%E7%87%83%E7%87%92%E6%B5%B7%E5%A0%B1.jpg	88
2024	238	2024-11-30	好运来	Good Luck	朱凌锋	乔杉、白客、王大陆、黄才伦、李嘉琦、米咪、魏翔、许君聪、王太利、艾伦、吴樾、马浴柯
2024	239	2024-11-30	不想和你有遗憾		蒋钦民	索微、丞磊
2024	240	2024-12-06	天地辽阔	Secret Land	杨柳松	王茜童、吴骏超
2024	241	2024-12-06	今年二十二	More Than a Game	倪萌	纪录片
2024	242	2024-12-06	小倩	Nie Xiaoqian	毛启超	纪录片
2024	243	2024-12-07	孤星计划	Burning Star	徐展雄	王源、张雪迎、梁靖康、李晨、印小天、韩童生、余皑磊、此沙、翟潇闻、张晓晨、陈雨锶、李嘉鑫、佟梦实		105
2024	244	2024-12-07	出不去的房间	Two Girls	刘方祺	姜贞羽、邹元清
2024	245	2024-12-10	盛极一时的爱情	Till Love Do Us Part	李冉	梁翠珊、张宁浩、任彬、张青
2024	246	2024-12-14	破·地狱	The Last Dance	陈茂贤	黄子华、许冠文、卫诗雅	https://upload.wikimedia.org/wikipedia/zh/5/5e/%E7%A0%B4%C2%B7%E5%9C%B0%E7%8D%842024.jpeg	127
2024	247	2024-12-14	市井英雄	Great Nobody	刘坤	郭采洁、刘迅、衣云鹤、岳旸、李诚儒、黄才伦、柳岩
2024	248	2024-12-14	多想和你再见一面	Promise of Decades	徐欣羡、唐家辉	此沙、何超莲、曾志伟、刘亦淳、黄宗泽		109
2024	249	2024-12-14	雄狮少年2	I Am What I Am 2	孙海鹏	动画片	https://upload.wikimedia.org/wikipedia/zh/5/5f/I_Am_What_I_Am_2.jpg	134
2024	250	2024-12-19	幸运阁	Revisit	黄婷婷	颜卓灵、张惠卿、翁静晶、萧子墨
2024	251	2024-12-20	异乡来客	The Coffin Painter	大飞	洛桑群培、张籽沐
2024	252	2024-12-20	钱来钱去		王大治	王大治、苗圃、柴碧云、苗阜、杨新鸣、王砚辉
2024	253	2024-12-20	一台好戏		秦一书	李晓波、陈宇星
2024	254	2024-12-20	张杰曜北斗巡回演唱会	Jason Zhang Brilliance Tour		纪录片
2024	255	2024-12-21	最后的告别	The Last Farewell	张中臣	王耀德、李志刚、温如玉、史迎杰
2024	256	2024-12-27	误判	The Prosecutor	甄子丹	甄子丹、张智霖、许冠文、吴镇宇、张天赋、郑则仕	https://upload.wikimedia.org/wikipedia/zh/e/e3/The_Prosecutor_poster.jpeg	118
2024	257	2024-12-27	小小的我	Big World	杨荔钠	易烊千玺、林晓杰、蒋勤勤、周雨彤		131
2024	258	2024-12-28	误杀3	Octopus with Broken Arms	甘剑宇	肖央、佟丽娅、段奕宏、刘雅瑟、王龙正、周楚濋、高捷、尹子维、张榕容	https://upload.wikimedia.org/wikipedia/zh/f/f3/Octopus_with_Broken_Arms_poster.jpg	109
2024	259	2024-12-31	“骗骗”喜欢你	Honey Money Phony	苏彪	金晨、孙阳、李雪琴、王耀庆
2024	260	2024-12-31	窗前明月，咣	Out of Order	魏泇丞、杜晓宇	费翔、左凌峰、傅菁、马东锡、宋小宝、黄小蕾、克拉拉、贾樟柯
2024	261	2024-12-31	回家的你	Home Coming	木童	徐帆、范伟、陈乔恩、周一围、张晨光、赵天宇、张伦硕
2024	262	2024-12-31	直播惊魂夜		马帅峰	魏璐、吴旭东
`.trim();

export const catalogMovies: Movie[] = rawMovieCatalog
  .split("\n")
  .map((line) => {
    const [yearValue, orderValue, releaseDate, title, originalTitle, director, cast, posterUrl = "", durationValue = ""] = line.split("\t");
    const releaseYear = Number(yearValue);
    const genre = inferGenres(title, originalTitle, cast);

    return {
      id: `cn-${releaseYear}-${orderValue}`,
      title,
      originalTitle,
      posterUrl,
      releaseYear,
      releaseDate,
      genre,
      country: "中国",
      director,
      description: createDescription(title, releaseYear, director, cast, genre),
      rating: 0,
      duration: durationValue ? Number(durationValue) : null,
      sourceUrl: SOURCE_URLS[releaseYear] ?? "",
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
  if (/警察|警|爆炸|搜查|寒战|消失|夜王|惊魂|半夜|哀牢山|天才游戏|改邪归正|东北警察|误杀|绑架|逃脱|猎狐|怒水|凶宅|怨灵|杀|案|危机|缉|罪|嫌疑|迷雾|破局|追凶|悬案/.test(text)) {
    return ["悬疑", "犯罪"];
  }
  if (/拳手|镖人|勇者|敢死队|无疆|神功|八府巡按|行动|突击|援军|蛟龙|射雕|封神|武替|英雄|江湖|风暴|风云|出击|冲锋|搏击/.test(text)) {
    return ["动作"];
  }
  if (/太空|星河|异种|登月|宇宙|机器人|未来|星空|科幻|Time|Moon|Space|Astra|Future/.test(text)) {
    return ["科幻"];
  }
  if (/情书|喜欢|遇见|爱情|浪漫|爱人|男人和一个女人|恋爱|真爱|婚礼|前任|告白|分手|Love|Romance|Woman|Sweet/.test(text)) {
    return ["爱情", "剧情"];
  }
  if (/福星|上班|马腾|解决专家|没问题|六六大顺|飞驰|拼桌|我的妈耶|许可|火锅|爸爸|红包|喜剧|熊出没|抓娃娃|好运|大场面|Comedy|OK/.test(text)) {
    return ["喜剧", "剧情"];
  }
  if (/1938|参军|曹雪芹|志愿军|解密|胜利|抗战|战争|长津湖|历史|大突围/.test(text)) {
    return ["历史", "剧情"];
  }

  return ["剧情"];
}

function createDescription(title: string, releaseYear: number, director: string, cast: string, genre: string[]) {
  if (cast === "动画片") {
    return `《${title}》是 ${releaseYear} 年中国大陆院线公映动画电影，来源于年度国产电影上映片单。`;
  }
  if (cast === "纪录片") {
    return `《${title}》是 ${releaseYear} 年中国大陆院线公映纪录电影，来源于年度国产电影上映片单。`;
  }

  const directorText = director || "待补";
  const castText = cast ? `，${cast}主演` : "";
  return `《${title}》是 ${releaseYear} 年中国大陆院线公映${genre.join("/")}电影，由${directorText}执导${castText}。`;
}
