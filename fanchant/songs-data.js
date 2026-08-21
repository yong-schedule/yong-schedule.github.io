/*
  songs-data.js
  ------------------------------------------------------------
  여기에 솔라 응원법 데이터를 넣으면 app.js가 자동으로
  목록 페이지 + 곡 상세 페이지를 만들어줘.

  ⚠️ 가사/응원 문구는 저작권 보호 대상이라 비워뒀어.
     PDF 보면서 직접 채워 넣으면 돼.

  한 곡의 형태:
  {
    id: "spit-it-out",        // URL에 쓰일 영문 slug (중복 금지)
    order: 1,                 // 트랙 번호 (태양 배지에 표시됨)
    titleKr: "뱉어",           // 곡 한글 제목
    titleEn: "Spit it out",   // 곡 영문 제목
    columns: [                // 좌/우 두 컬럼. 필요하면 1개만 써도 됨
      [ // 왼쪽 컬럼
        { text: "가사 줄", tag: null },          // 그냥 가사 줄
        { text: "가사 줄", tag: "cheer" },        // 떼창/응원 문구 강조
        { text: "가사 줄", tag: "cheer" },          // 안무 큐 / 콜백 강조
        { text: "", tag: "spacer" },              // 줄바꿈용 빈 줄
      ],
      [ // 오른쪽 컬럼
        { text: "가사 줄", tag: null },
      ]
    ]
  }
*/

const SONGS = [
  {
    id: "spit-it-out",
    order: 1,
    titleKr: "뱉어",
    titleEn: "Spit it out",
    columns: [
      [
        {text:"하고 싶은 대로 다 하고 살아 지금껏 난",tag:null},
        {text:"재밌는 걸 또 찾아 매일 새로워 난",tag:null},
        {text:"Because I'm ready",tag:null},
        {text:"Baby driving me crazy",tag:null},
        {text:"거기 어서 call my ne ne name",tag:null},
        {text:"50/50 난 도마 위에 올라타",tag:null},
        {text:"여자니까 OH 상관없어 my way~",tag:null},
        {text:"Because I love me 굳이 욕할 건 없지",tag:null},
        {text:"그냥 call my ne ne name",tag:null},

        {text:"Set a fire fire fire",tag:null},
        {text:"뜨거운 입술로 뱉어 (뱉어)",tag:"cheer"},
        {text:"빨간 내 입술로 내뱉어 (내뱉어↗)",tag:"cheer"},
        {text:"Up down down 몸을 맡겨",tag:"cheer"},
        {text:"내 목소리를 들어",tag:null},
        {text:"아침부터 잠들 때까지",tag:null},
        {text:"뜨거운 입술로 뱉어 (뱉어)",tag:"cheer"},
        {text:"차가운 그 입술은 닫아",tag:null},
        {text:"clap clap 그냥 즐겨",tag:"cheer"},
        {text:"내 이름을 불러",tag:null},
        {text:"아침부터 잠들 때까지 (김.용.선.)",tag:"cheer"},

        {text:"꼬릴 꼬여 (야야야)",tag:"cheer"},
        {text:"나를 따라오는 팔로워 (-야야)",tag:"cheer"},
        {text:"Sin prisa pero sin pausa (야야)",tag:"cheer"},
        {text:"참고 기다리다 뱉어 (-야야)",tag:"cheer"},

        {text:"노력한 대로 난",tag:null},
        {text:"얻을 수 있다는 말",tag:null},
        {text:"어릴 때부터 매일 엄마에게 늘 들었던 말이야",tag:null},
        {text:"나는 나대로 여기 나의 뜻대로",tag:null},
        {text:"이젠 call my ne ne name",tag:null}
      ],
      [
        {text:"Set a fire fire fire",tag:null},
        {text:"뜨거운 입술로 뱉어 (뱉어)",tag:"cheer"},
        {text:"빨간 내 입술로 내뱉어 (내뱉어↗)",tag:"cheer"},
        {text:"Up down down 몸을 맡겨",tag:"cheer"},
        {text:"내 목소리를 들어",tag:null},
        {text:"아침부터 잠들 때까지",tag:null},
        {text:"뜨거운 입술로 뱉어 (뱉어)",tag:"cheer"},
        {text:"차가운 그 입술은 닫아",tag:null},
        {text:"clap clap 그냥 즐겨",tag:"cheer"},
        {text:"내 이름을 불러",tag:null},
        {text:"아침부터 잠들 때까지 (김.용.선.)",tag:"cheer"},

        {text:"뜨거운 입술로 뱉어 (사랑해!!!)",tag:"cheer"},
        {text:"뜨거운 입술로 뱉어 (영원히!!!)",tag:"cheer"},
        {text:"뜨거운 입술로 뱉어 (김용선!!!)",tag:"cheer"},
        {text:"뱉어 (뱉어) 뱉어 (뱉어)",tag:"cheer"},
        {text:"뜨거운 입술로 뱉어",tag:null},
        {text:"뜨거운 입술로 뱉어",tag:null},
        {text:"뜨거운 입술로 (뱉.어.대.박.)",tag:"cheer"},

        {text:"Set a fire fire fire",tag:null},
        {text:"뜨거운 입술로 뱉어 (뱉어)",tag:"cheer"},
        {text:"빨간 내 입술로 내뱉어 (내뱉어↗)",tag:"cheer"},
        {text:"Up down down 몸을 맡겨",tag:"cheer"},
        {text:"내 목소리를 들어",tag:null},
        {text:"아침부터 잠들 때까지",tag:null},
        {text:"뜨거운 입술로 뱉어 (뱉어)",tag:"cheer"},
        {text:"차가운 그 입술은 닫아",tag:null},
        {text:"clap clap 그냥 즐겨",tag:"cheer"},
        {text:"내 이름을 불러",tag:null},
        {text:"아침부터 잠들 때까지 (함성)",tag:"cheer"}
      ]
    ]
  },

  {
    id:"honey",
    order:2,
    titleKr:"꿀",
    titleEn:"HONEY",
    columns:[
      [
        {text:"(00:04 솔.라.꿀.떨.어.진.다)",tag:"cheer"},
        {text:"내가 좀 꿀리니",tag:null},
        {text:"하긴 뭐 말해 뭐해",tag:"cheer"},
        {text:"대답만 하면 돼",tag:null},
        {text:"그저 Do Do Do Do Do it",tag:"cheer"},
        {text:"우리 둘이 같은 걸",tag:null},
        {text:"보고 있다 생각하니 넌 (Ay)",tag:null},
        {text:"아이쿠 넌 그저 내 Fishing ground",tag:null},

        {text:"난리 다 난리",tag:null},
        {text:"네 눈에 꿀이 drop drop it",tag:"cheer"},
        {text:"바삐 모두 바삐",tag:null},
        {text:"어지럽게 모여 휙",tag:"cheer"},
        {text:"윙윙 호랑나비들도 모여",tag:"cheer"},
        {text:"붕붕붕 모두 조급해 보여",tag:"cheer"},
        {text:"네가 네가 다가와 나를 볼 때마다",tag:null},

        {text:"꿀 떨어진다 뚝뚝",tag:"cheer"},
        {text:"잘한다 잘한다",tag:null},
        {text:"아이 예뻐 우쭈쭈쭈",tag:"cheer"},
        {text:"뿡뿡뿡 움직여",tag:"cheer"},
        {text:"감히 넘볼 수 없는 그 zone",tag:null},
        {text:"Don't say anymore Do Do Do",tag:"cheer"},
        {text:"그러다가 나 다칠라",tag:null},

        {text:"다 줄 듯 말 듯 하게 다가가",tag:null},
        {text:"다 줬다 뺏다 할래",tag:null},
        {text:"모조리 다 다 나를 보고 눈빛에서 꿀이 (무.무.눈.에.꿀.이)",tag:"cheer"},
        {text:"다 잡은 물고기라 방심하다",tag:null},
        {text:"크게 다칠 거야",tag:null},
        {text:"선불리 덤비지는 마",tag:null},
        {text:"꿀 떨어진다",tag:"cheer"},
        {text:"꿀 떨어진다",tag:"cheer"},

        {text:"크흠티만 입었었지 빨간",tag:null},
        {text:"몰랐었지 의미를 그땐",tag:null},
        {text:"이제 새겨 다 커보니 알게 된",tag:null},
        {text:"Famous saying my friend piglet (피글렛)",tag:"cheer"}
      ],
      [
        {text:"뚫뚫해봐 그래봤자 넘어가나 내가",tag:null},
        {text:"조심해 그러다 너 꿀 떨어질라",tag:null},
        {text:"What about me",tag:"cheer"},
        {text:"어차피 나 좋아할 거 알고 있으니 뭐 (좋.아.해)",tag:"cheer"},

        {text:"가만가만히 눈을 감아 느껴",tag:null},
        {text:"입술 그 맛 HONEY",tag:"cheer"},
        {text:"더 달콤한 베어구미",tag:"cheer"},
        {text:"윙윙 호랑나비들도 모여",tag:"cheer"},
        {text:"붕붕붕 모두 조급해 보여",tag:"cheer"},
        {text:"네가 네가 다가와 나를 볼 때마다",tag:null},

        {text:"꿀 떨어진다 뚝뚝",tag:"cheer"},
        {text:"잘한다 잘한다",tag:null},
        {text:"아이 예뻐 우쭈쭈쭈",tag:"cheer"},
        {text:"뿡뿡뿡 움직여",tag:"cheer"},
        {text:"감히 넘볼 수 없는 그 zone",tag:null},
        {text:"Don't say anymore Do Do Do",tag:"cheer"},
        {text:"그러다가 나 다칠라",tag:null},

        {text:"다 줄 듯 말 듯 하게 다가가",tag:null},
        {text:"다 줬다 뺏다 할래",tag:null},
        {text:"모조리 다 다 나를 보고 눈빛에서 꿀이 (무.무.눈.에.꿀.이)",tag:"cheer"},
        {text:"다 잡은 물고기라 방심하다",tag:null},
        {text:"크게 다칠 거야",tag:null},
        {text:"선불리 덤비지는 마",tag:null},
        {text:"꿀 떨어진다",tag:"cheer"},

        {text:"(2:28 꿀 떨어져 김용선 꿀 보이스 김용선 꿀 떨어져 무무도)",tag:"cheer"},
        {text:"뿡뿡뿡 움직여",tag:"cheer"},
        {text:"(꿀 떨어져 김용선 달다 달아 김용선 꿀 떨어져 무무도)",tag:"cheer"},
        {text:"꿀 떨어진다",tag:"cheer"}
      ]
    ]
  },

  {
    id:"colors",
    order:3,
    titleKr:"Colors",
    titleEn:"Colors",
    columns:[
      [
        {text:"(함성)",tag:"cheer"},
        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"I want a black and white one and a pink doesn't matter",tag:null},

        {text:"Hey stop,",tag:"cheer"},
        {text:"What you want?",tag:null},
        {text:"Tell me everything you want",tag:null},
        {text:"What do you want? what do you want?",tag:null},
        {text:"Tell me everything you want",tag:null},
        {text:"Oh yes,",tag:"cheer"},
        {text:"What you want?",tag:null},
        {text:"Tell me everything you want",tag:null},
        {text:"What do you want? what do you want?",tag:null},
        {text:"Tell me I'll do what you want",tag:null},

        {text:"Look in the mirror",tag:"cheer"},
        {text:"And pose so damn fine and say it",tag:null},
        {text:"I'm sick so bad",tag:null},
        {text:"Louder louder",tag:"cheer"},
        {text:"I'm sick, I'm hot, I'm gorgeous, so bad",tag:"cheer"},

        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"Black and white one and a pink or purple",tag:null},
        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"Black and white one and a pink doesn't matter",tag:null},

        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"(Boom Boom Boom)",tag:"cheer"},
        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"(Boom Boom Boom)",tag:"cheer"},
        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"(Boom Boom Boom)",tag:"cheer"}
      ],
      [
        {text:"I walk like a model, people say oh",tag:null},
        {text:"Who's that sexy thang",tag:null},
        {text:"I see over there (Yeah that's me)",tag:"cheer"},
        {text:"Don't worry about it",tag:null},
        {text:"Do the do the thang",tag:null},
        {text:"Hey, just believe in yourself",tag:null},
        {text:"What you want a do?",tag:null},
        {text:"Just sing it out loud",tag:null},

        {text:"Look in the mirror",tag:"cheer"},
        {text:"And pose so damn fine and say it",tag:null},
        {text:"I'm sick so bad",tag:null},
        {text:"Louder louder",tag:"cheer"},
        {text:"I'm sick, I'm hot, I'm gorgeous, so bad",tag:"cheer"},

        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"Black and white one and a pink or purple",tag:null},
        {text:"I want a black and white one and a pink or purple",tag:null},
        {text:"Black and white one and a pink doesn't matter",tag:null},

        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"(Boom Boom Boom)",tag:"cheer"},
        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"(Boom Boom Boom)",tag:"cheer"},
        {text:"kick it up kick it up",tag:null},
        {text:"kick it up kick it up kick it up kick it up",tag:null},
        {text:"(Boom Boom Boom)",tag:"cheer"}
      ]
    ]
  },

  {
    id:"but-i",
    order:4,
    titleKr:"But I",
    titleEn:"But I",
    columns:[
      [
        {text:"(00:06 But I Love You 김용선!)",tag:"cheer"},
        {text:"핀 적도 없는 저 꽃 한 송이를 봐 봐",tag:null},
        {text:"온기 하나 없는 저 끝 차디찬 바닥",tag:null},
        {text:"아무 감정도, 아무 관심도 없는 네 눈빛에 말라",tag:null},
        {text:"말라 비틀어진 날 보고도",tag:null},
        {text:"단 한 번도 말 한마디 꺼낸 적 없지",tag:null},
        {text:"아름다운 이별",tag:null},
        {text:"아니 개나 줘버려",tag:null},

        {text:"Everybody thinks I was happy, happy but I I I I",tag:null},
        {text:"(솔.라.용.선.벗.아.이)",tag:"cheer"},
        {text:"Damn",tag:null},

        {text:"I really hate you",tag:"cheer"},
        {text:"착한 척은 집어치워",tag:null},
        {text:"Oh oh oh I bloody hate you",tag:"cheer"},
        {text:"You love me (yes!)",tag:"cheer"},
        {text:"거짓말은 집어치워",tag:null},
        {text:"Oh oh oh you'd better shut up",tag:"cheer"},
        {text:"Your body, your money, your face, your vibe",tag:"cheer"},
        {text:"Oh oh oh I really hate them",tag:"cheer"},
        {text:"불쌍한 자 자비를 베푸소서 amen",tag:null},

        {text:"친구들이 말해 미친 거 아니냐고",tag:null},
        {text:"내가 프로필 바꾼 거 다 봤냐고",tag:null},
        {text:"I don't want to hear anything",tag:"cheer"},
        {text:"Don't say anything",tag:"cheer"},
        {text:"머리를 쓸어 넘겨",tag:null},
        {text:"모든 기억도 같이 던져버릴 거니까",tag:null},
        {text:"이제 당당히 걸어 다시 내가",tag:null},
        {text:"I'll love myself",tag:"cheer"},
        {text:"Everybody thinks I'm not happy, happy but I I I I",tag:null},
        {text:"(솔.라.용.선.벗.아.이)",tag:"cheer"},
        {text:"Huh",tag:null}
      ],
      [
        {text:"I really hate you",tag:"cheer"},
        {text:"착한 척은 집어치워",tag:null},
        {text:"Oh oh oh I bloody hate you",tag:"cheer"},
        {text:"You love me (yes!)",tag:"cheer"},
        {text:"거짓말은 집어치워",tag:null},
        {text:"Oh oh oh you'd better shut up",tag:"cheer"},
        {text:"Your body, your money, your face, your vibe",tag:"cheer"},
        {text:"Oh oh oh I really hate them",tag:"cheer"},
        {text:"다시 태어난 걸 감사해 amen",tag:null},
        {text:"햇살 아래 활짝 핀 저 꽃 한 송이",tag:null},
        {text:"다신 지지 않을 것처럼 피어나네",tag:null},
        {text:"(함성)",tag:"cheer"}
      ]
    ]
  },

  {
    id:"want",
    order:5,
    titleKr:"WANT",
    titleEn:"WANT",
    columns:[
      [
        {text:"I'm ready to start",tag:null},
        {text:"어디로든 Fly",tag:null},
        {text:"Lo-Lo-Love is what I WANT",tag:null},
        {text:"Lo-Lo-Love is what I WANT",tag:null},
        {text:"What I WANT",tag:"cheer"},
        {text:"Love is all my world",tag:null},
        {text:"마음이 가는 그대로",tag:null},
        {text:"Don't think too much",tag:null},
        {text:"It's time to go",tag:null},
        {text:"What do you WANT?",tag:"cheer"},
        {text:"다른 건 신경 쓰지 마",tag:null},
        {text:"Lo-Lo-Love is coming up",tag:null},
        {text:"Lo-Lo-Love is coming up",tag:null},
        {text:"Let's go!",tag:"cheer"},

        {text:"Run at my pace",tag:null},
        {text:"걸음을 떼",tag:null},
        {text:"서툴더라도 난 I'm not afraid",tag:null},
        {text:"You know I WANT it",tag:null},
        {text:"I know you WANT it, Babe",tag:"cheer"},
        {text:"고민 없이",tag:null},
        {text:"Follow my lead",tag:null},
        {text:"두 눈을 맞추고 한 걸음씩",tag:null},
        {text:"사뿐히 걸어가 Never give it up!",tag:"cheer"},
        {text:"(So give me that, Hur!)",tag:"cheer"},

        {text:"I'm ready to start",tag:null},
        {text:"어디로든 Fly",tag:null},
        {text:"Love is what I WANT",tag:null},
        {text:"Lo-Lo-Love is what I WANT (I WANT)",tag:"cheer"},
        {text:"빛을 비춘 Something",tag:"cheer"},
        {text:"걱정 따윈 Nothing",tag:"cheer"},
        {text:"Love is what you WANT",tag:null},
        {text:"Lo-Lo-Love is what you WANT",tag:null},

        {text:"L O V E what I WANT",tag:null},
        {text:"what I WANT, what I WANT!",tag:"cheer"},
        {text:"L O V E what you WANT",tag:null},
        {text:"what you WANT, what you WANT!",tag:"cheer"}
      ],
      [
        {text:"더 설레는 Scene이",tag:null},
        {text:"우리를 기다릴 테니",tag:null},
        {text:"Love is all my world",tag:null},
        {text:"Love is all my world",tag:null},
        {text:"Love, Fall in love",tag:"cheer"},
        {text:"알듯 말듯 해도 Baby let go, A-ha",tag:null},
        {text:"Love, Only one",tag:"cheer"},
        {text:"머릿속 콜라보로 둘이 함께 La-la-la",tag:"cheer"},
        {text:"Be my baby oh, I can't wait for",tag:null},
        {text:"이건 Melo 계속 Play on",tag:null},
        {text:"Lo-Lo-Love is coming up",tag:null},
        {text:"Lo-Lo-Love is coming up",tag:null},
        {text:"You ready?",tag:null},

        {text:"Look at my face",tag:null},
        {text:"열까지 세",tag:null},
        {text:"익숙한 모든 게 새롭게 Change",tag:null},
        {text:"You know I WANT it",tag:null},
        {text:"I know you WANT it, Babe",tag:"cheer"},
        {text:"머리는 핑",tag:"cheer"},
        {text:"두 볼은 Pink",tag:"cheer"},
        {text:"숨 한번 내쉬고 Just come with me",tag:null},
        {text:"박차고 걸어가 Baby wish me luck!",tag:"cheer"},

        {text:"I'm ready to start",tag:null},
        {text:"Love is what I WANT",tag:null},
        {text:"Lo-Lo-Love is what I WANT (I WANT)",tag:"cheer"},
        {text:"빛을 비춘 Something",tag:"cheer"},
        {text:"걱정 따윈 Nothing",tag:"cheer"},
        {text:"Love is what you WANT",tag:null},
        {text:"Lo-Lo-Love is what you WANT",tag:null},
        {text:"L O V E what I WANT",tag:null},
        {text:"what I WANT, what I WANT!",tag:"cheer"},
        {text:"L O V E what you WANT",tag:null},
        {text:"what you WANT, what you WANT!",tag:"cheer"},
        {text:"더 설레는 Scene이",tag:null},
        {text:"우리를 기다릴 테니",tag:null}
      ],
      [
        {text:"Love is all my world",tag:null},
        {text:"Love is all my world",tag:null},
        {text:"함께 써 내려갈 Days",tag:null},
        {text:"그 첫 번째 페이지",tag:null},
        {text:"첫 문장을 지금 시작해",tag:null},
        {text:"아껴왔던 내 마음을 줄게",tag:null},
        {text:"겁내지 말고 그냥 쭉",tag:"cheer"},
        {text:"가보는 거야 우리 둘",tag:"cheer"},
        {text:"Ready go Ready go (Let's fly up!)",tag:"cheer"},
        {text:"기분도 하늘로 (Let's ride up!)",tag:"cheer"},
        {text:"Have a secret talk",tag:"cheer"},
        {text:"기대해 봐 우리 Happy End",tag:"cheer"},
        {text:"Here we go Here we go (Let's fly up!)",tag:"cheer"},
        {text:"오늘도 내일로 (Let's ride up!)",tag:"cheer"},
        {text:"너에게 나 원하는 건 (함성)",tag:"cheer"},

        {text:"I'm ready to start",tag:null},
        {text:"꿈꾸듯이 Fly",tag:null},
        {text:"Love is all my world",tag:null},
        {text:"Lo-Lo-Love is all my world",tag:null},
        {text:"서로를 담은 눈빛",tag:null},
        {text:"요동치는 Heartbeat",tag:"cheer"},
        {text:"Love is all your world",tag:null},
        {text:"Lo-Lo-Love is all your world",tag:null},

        {text:"L O V E what I WANT",tag:null},
        {text:"what I WANT, what I WANT!",tag:"cheer"},
        {text:"L O V E what you WANT",tag:null},
        {text:"what you WANT, what you WANT!",tag:"cheer"},
        {text:"L O V E what I WANT",tag:null},
        {text:"what I WANT, what I WANT!",tag:"cheer"},
        {text:"L O V E what you WANT",tag:null},
        {text:"Love is all my world (함성)",tag:"cheer"}
      ]
    ]
  },

  {
    id:"floating-free",
    order:6,
    titleKr:"Floating Free",
    titleEn:"Floating Free",
    columns:[
      [
        {text:"(00:07 Floating Free!)",tag:"cheer"},
        {text:"天亮了 怎么烦恼还待在这",tag:null},
        {text:"日复一日 好像还没清醒",tag:null},
        {text:"每当我想找个人聊聊我最近心情",tag:null},
        {text:"总会想起你",tag:null},
        {text:"消息就響起",tag:"cheer"},
        {text:"总是无聊 想着最靠近",tag:null},
        {text:"你有点被动 但我已读懂你心情",tag:null},
        {text:"此刻温柔的太阳啊 照在我的手心",tag:null},
        {text:"我知道一定是我们心电感应",tag:null},

        {text:"如果你感到困惑",tag:null},
        {text:"我知道你在等我说",tag:"cheer"},
        {text:"因为",tag:null},
        {text:"You & Me",tag:"cheer"},
        {text:"聊着一样话题",tag:null},
        {text:"忘了时间距离 谈节奏靠近你",tag:null},
        {text:"We're Floating Free",tag:"cheer"},
        {text:"穿梭在太阳系",tag:null},
        {text:"对抗地心引力 随着心跳升起",tag:null},
        {text:"潮汐将我拉向你",tag:"cheer"},

        {text:"谁知道明天啊 明天啊",tag:null},
        {text:"明天会怎么样?",tag:null},
        {text:"在这个宇宙里",tag:null},
        {text:"旋转某种定律",tag:null},
        {text:"环绕着奇妙秩序",tag:null},
        {text:"是不是因为所以遇见了你",tag:null},
        {text:"他们说这多不容易",tag:null},
        {text:"需要万分之一的运气",tag:"cheer"},
        {text:"因为",tag:null},
        {text:"You & Me",tag:"cheer"},
        {text:"聊着一样话题",tag:null},
        {text:"忘了时间距离 让节奏靠近你",tag:null},
        {text:"We're Floating Free",tag:"cheer"}
      ],
      [
        {text:"穿梭在太阳系",tag:null},
        {text:"对抗地心引力 随着心跳升起",tag:null},
        {text:"潮汐将我拉向你",tag:"cheer"},
        {text:"同样的太阳 有时候也会疲倦",tag:null},
        {text:"在这银河璀璨的世界",tag:null},
        {text:"迷人的月亮 在雾霾之中沉睡",tag:null},
        {text:"幸好有你照亮了我的边界",tag:null},
        {text:"因为",tag:null},
        {text:"You & Me",tag:"cheer"},
        {text:"聊着一样话题",tag:null},
        {text:"忘了时间距离 谈节奏靠近你",tag:null},
        {text:"We're Floating Free",tag:"cheer"},
        {text:"穿梭在太阳系",tag:null},
        {text:"对抗地心引力 随着心跳升起",tag:null},
        {text:"丢掉时间距离",tag:null},
        {text:"兴奋的忘了呼吸",tag:"cheer"},
        {text:"I'll be there for you",tag:null},
        {text:"对抗地心引力 随着心跳升起",tag:null},
        {text:"潮汐将我拉向你 (潮汐将我拉向你)",tag:"cheer"},
        {text:"浪漫全被你牵引",tag:null},
        {text:"(함성)",tag:"cheer"}
      ]
    ]
  },

  {
    id:"floating-free-korean-ver",
    order:7,
    titleKr:"Floating Free (Korean Ver.)",
    titleEn:"Floating Free (Korean Ver.)",
    columns:[
      [
        {text:"(00:07 Floating Free!)",tag:"cheer"},
        {text:"Everyday 유달리 다를 것 없이",tag:null},
        {text:"흘린 듯 창가에 눈을 맞춰",tag:null},
        {text:"오늘따라 또 흐린 건지",tag:null},
        {text:"아니면 잠이 덜 깬 건지",tag:null},
        {text:"I don't care",tag:"cheer"},
        {text:"Yo, It's OK",tag:null},
        {text:"또 쓸데없는 생각하다가",tag:null},
        {text:"바쁘게 세상 속에 스며들어가",tag:null},
        {text:"우리는 어딨을까, 같은 생각 할까",tag:null},
        {text:"Inside this song, we're no longer apart at all",tag:null},

        {text:"너의 하루 끝에 들려오는 이 멜로디",tag:"cheer"},
        {text:"여기 You & Me",tag:"cheer"},
        {text:"Where we're meant to be",tag:null},
        {text:"시간을 앞질러 우리의 거리를 넘어",tag:null},
        {text:"We're Floating Free",tag:"cheer"},
        {text:"어디든 far away",tag:null},
        {text:"너에게 이끌려 어두운 밤을 건너",tag:null},
        {text:"내 마음을 띄워 보내",tag:null},

        {text:"오늘도 지루해 지루해 지루해하던 날",tag:null},
        {text:"밖이나 볼까 I'm so fried!",tag:null},
        {text:"그냥 달달한 밀크티 한 잔에",tag:null},
        {text:"저항 없이 다 녹아내려 난",tag:null},

        {text:"이 노래 그 끝에서",tag:null},
        {text:"너와 나 바람이 되어",tag:"cheer"},
        {text:"여기 You & Me",tag:"cheer"},
        {text:"Where we're meant to be",tag:null},
        {text:"시간을 앞질러 우리의 거리를 넘어",tag:null},
        {text:"We're Floating Free",tag:"cheer"},
        {text:"어디든 far away",tag:null},
        {text:"너에게 이끌려 어두운 밤을 건너",tag:null},
        {text:"내 마음을 띄워 보내",tag:null}
      ],
      [
        {text:"별도 하나 없는 외로운 이 밤",tag:null},
        {text:"네 목소리에 기대 줘",tag:null},
        {text:"내 마음속 깊은 어딘가 이 울림이",tag:null},
        {text:"너에게 온전히 닿을 수 있게",tag:null},

        {text:"여기 You & Me",tag:"cheer"},
        {text:"Where we're meant to be",tag:null},
        {text:"시간을 앞질러 우리의 거리를 넘어",tag:null},
        {text:"We're Floating Free",tag:"cheer"},
        {text:"어디든 far away",tag:null},
        {text:"너에게 이끌려 어두운 밤을 건너",tag:null},
        {text:"다른 하늘 아래 같은 곳을 향해",tag:"cheer"},
        {text:"I'll be there for you",tag:null},
        {text:"너에게 이끌려 어두운 밤을 건너",tag:null},
        {text:"내 마음을 띄워 보내 (달을 듯 저 너머로)",tag:"cheer"},
        {text:"널 담은 노래 속에",tag:null},
        {text:"(함성)",tag:"cheer"}
      ]
    ]
  }
];

if (typeof module !== "undefined") {
  module.exports = SONGS;
}
