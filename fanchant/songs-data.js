/*
  songs-data.js
  ------------------------------------------------------------
  Solar 팬챈트(Fan Chant) 페이지 데이터.

  ## 구조 변경 안내 (이전 버전 대비)
  이전 버전은 색칠된(응원법) 단어만 따로 뽑아 flat 배열로 저장했고,
  그 단어가 어느 가사 줄에 속해 있었는지(일반 검정 가사)는 버렸습니다.
  그 결과 "다", "난" 같은 글자가 문맥 없이 홀로 남아 이상하게 표시되는
  문제가 있었습니다.

  이번 버전은 각 컬럼을 "줄(line) 단위 배열"로 바꾸고, 한 줄 안에서도
  검정 가사와 색칠된 응원법이 등장하는 순서 그대로 segment로 쪼갰습니다.

  각 줄(line) = segment 배열
  각 segment = { text, tag }
    - tag: "lyric" → 일반 가사 (검정, 응원법 아님)
    - tag: "cheer" → 응원법 (괄호 없이 색칠된 부분)
    - tag: "cue"   → 콜/타이밍 (괄호로 표시된 색칠된 부분)

  song 객체에 verified: true 인 곡은 실제 캡처 이미지와 한 줄씩
  대조해서 재구성한 것이고, verified: false 인 곡(WANT, Floating Free 등)은
  이번에 원본 이미지가 없어서 기존 데이터 구조를 그대로 옮겨온 것뿐이라
  같은 문제(검정 가사 누락)가 남아있을 수 있습니다. 원본 캡처를 주시면
  마저 검증해서 고칠 수 있습니다.
*/

const SONGS = [
  {
    id: "spit-it-out",
    order: 1,
    titleKr: "뱉어",
    titleEn: "Spit it out",
    verified: true,
    columns: [
      [
        [{ text: "하고 싶은 대로 ", tag: "lyric" }, { text: "다", tag: "cheer" }, { text: " 하고 살아 지금껏 ", tag: "lyric" }, { text: "난", tag: "cheer" }],
        [{ text: "재밌는 걸 또 찾아 매일 새로워 ", tag: "lyric" }, { text: "난", tag: "cheer" }],
        [{ text: "Because I'm ready", tag: "lyric" }],
        [{ text: "Baby driving me crazy", tag: "lyric" }],
        [{ text: "거기 어서 call my ne ne name", tag: "lyric" }],
        [{ text: "50/50 ", tag: "lyric" }, { text: "난", tag: "cheer" }, { text: " 도마 위에 늘 올라타", tag: "lyric" }],
        [{ text: "여자니까 왜 상관없어 ", tag: "lyric" }, { text: "my way~", tag: "cheer" }],
        [{ text: "Because I love me 굳이 욕할 건 없지", tag: "lyric" }],
        [{ text: "그냥 call my ne ne name", tag: "lyric" }],
        [{ text: "Set a fire fire fire", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "빨간 내 입술로 ", tag: "lyric" }, { text: "내뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(내뱉어↗)", tag: "cue" }],
        [{ text: "Up down down", tag: "cheer" }, { text: " 몸을 맡겨", tag: "lyric" }],
        [{ text: "내 목소리를 들어", tag: "lyric" }],
        [{ text: "아침부터 잠들 때까지", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "차가운 그 입술은 닫아", tag: "lyric" }],
        [{ text: "clap clap", tag: "cheer" }, { text: " 그냥 즐겨", tag: "lyric" }],
        [{ text: "(clap clap 할 때 함께 박수도 쳐주세요!)", tag: "cue" }],
        [{ text: "내 이름을 불러", tag: "lyric" }],
        [{ text: "아침부터 잠들 때까지 ", tag: "lyric" }, { text: "(김.용.선.)", tag: "cue" }],
        [{ text: "고갤 끄덕여 ", tag: "lyric" }, { text: "(야야야)", tag: "cue" }],
        [{ text: "나를 따라오는 팔로워 ", tag: "lyric" }, { text: "(-야야)", tag: "cue" }],
        [{ text: "Sin prisa pero sin pausa ", tag: "lyric" }, { text: "(야야)", tag: "cue" }],
        [{ text: "참고 기다리다 뱉어 ", tag: "lyric" }, { text: "(-야야)", tag: "cue" }],
        [{ text: "노력한 대로 ", tag: "lyric" }, { text: "난", tag: "cheer" }],
        [{ text: "얻을 수 있다는 말", tag: "lyric" }],
        [{ text: "어릴 때부터 매일 엄마에게 늘 들었던 말이야", tag: "lyric" }],
        [{ text: "나는 나대로 여기 나의 뜻대로", tag: "lyric" }],
        [{ text: "이젠 call my ne ne name", tag: "lyric" }]
      ],
      [
        [{ text: "Set a fire fire fire", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "빨간 내 입술로 ", tag: "lyric" }, { text: "내뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(내뱉어↗)", tag: "cue" }],
        [{ text: "Up down down", tag: "cheer" }, { text: " 몸을 맡겨", tag: "lyric" }],
        [{ text: "내 목소리를 들어", tag: "lyric" }],
        [{ text: "아침부터 잠들 때까지", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "차가운 그 입술은 닫아", tag: "lyric" }],
        [{ text: "clap clap", tag: "cheer" }, { text: " 그냥 즐겨", tag: "lyric" }],
        [{ text: "(clap clap 할 때 함께 박수도 쳐주세요!)", tag: "cue" }],
        [{ text: "내 이름을 불러", tag: "lyric" }],
        [{ text: "아침부터 잠들 때까지 ", tag: "lyric" }, { text: "(김.용.선.)", tag: "cue" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(사랑해!!!)", tag: "cue" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(영원히!!!)", tag: "cue" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(김용선!!!)", tag: "cue" }],
        [{ text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }, { text: " ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "(뱉.어.대.박.)", tag: "cue" }],
        [{ text: "Set a fire fire fire", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "빨간 내 입술로 ", tag: "lyric" }, { text: "내뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(내뱉어↗)", tag: "cue" }],
        [{ text: "Up down down", tag: "cheer" }, { text: " 몸을 맡겨", tag: "lyric" }],
        [{ text: "내 목소리를 들어", tag: "lyric" }],
        [{ text: "아침부터 잠들 때까지", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }, { text: " ", tag: "lyric" }, { text: "(뱉어)", tag: "cue" }],
        [{ text: "차가운 그 입술은 닫아", tag: "lyric" }],
        [{ text: "clap clap", tag: "cheer" }, { text: " 그냥 즐겨", tag: "lyric" }],
        [{ text: "(clap clap 할 때 함께 박수도 쳐주세요!)", tag: "cue" }],
        [{ text: "내 이름을 불러", tag: "lyric" }],
        [{ text: "아침부터 잠들 때까지", tag: "lyric" }],
        [{ text: "뜨거운 입술로 ", tag: "lyric" }, { text: "뱉어", tag: "cheer" }],
        [{ text: "(함성~~~)", tag: "cue" }]
      ]
    ]
  },

  {
    id: "honey",
    order: 2,
    titleKr: "꿀",
    titleEn: "HONEY",
    verified: true,
    columns: [
      [
        [{ text: "(00:04 솔.라.꿀.떨.어.진.다)", tag: "cue" }],
        [{ text: "내가 좀 끌리니", tag: "lyric" }],
        [{ text: "하긴 뭐 말해 뭐해", tag: "cheer" }],
        [{ text: "대답만 하면 돼", tag: "lyric" }],
        [{ text: "그저 ", tag: "lyric" }, { text: "Do Do Do Do Do it", tag: "cheer" }],
        [{ text: "우리 둘이 같은 걸", tag: "lyric" }],
        [{ text: "보고 있다 생각하니 넌 ", tag: "lyric" }, { text: "(Ay)", tag: "cue" }],
        [{ text: "아이쿠 넌 그저 내 fishing ground", tag: "lyric" }],
        [{ text: "난리 다 난리", tag: "lyric" }],
        [{ text: "네 눈에 꿀이 ", tag: "lyric" }, { text: "drop drop it", tag: "cheer" }],
        [{ text: "바빠 모두 바빠", tag: "lyric" }],
        [{ text: "여기저기 모여 휙", tag: "cheer" }],
        [{ text: "윙윙", tag: "cheer" }, { text: " 호랑나비들도 모여", tag: "lyric" }],
        [{ text: "붕붕붕", tag: "cheer" }, { text: " 모두 조급해 보여", tag: "lyric" }],
        [{ text: "네가 네가 다가와 나를 볼 때마다", tag: "lyric" }],
        [{ text: "꿀 떨어진다 ", tag: "lyric" }, { text: "뚝뚝뚝", tag: "cheer" }],
        [{ text: "잘한다 잘한다", tag: "lyric" }],
        [{ text: "아이 예뻐 ", tag: "lyric" }, { text: "우쭈쭈쭈", tag: "cheer" }],
        [{ text: "쁨쁨쁨쁨 움직여", tag: "lyric" }],
        [{ text: "감히 넘볼 수 없는 그 zone", tag: "lyric" }],
        [{ text: "Don't say anymore ", tag: "lyric" }, { text: "Do Do Do", tag: "cheer" }],
        [{ text: "그러다가 나 다 놓칠라", tag: "lyric" }],
        [{ text: "다 줄 듯 말 듯 하게 ", tag: "lyric" }, { text: "다가가", tag: "cheer" }],
        [{ text: "다 줬다 뺏다 할래", tag: "lyric" }],
        [{ text: "모조리 다 나를 보고 눈빛에서 꿀이 ", tag: "lyric" }, { text: "(무.무.눈.에.꿀.이)", tag: "cue" }],
        [{ text: "다 잡은 물고기라 방심하다", tag: "lyric" }],
        [{ text: "크게 다칠 거야", tag: "lyric" }],
        [{ text: "섣불리 덤비지는 마", tag: "lyric" }],
        [{ text: "꿀 떨어진다", tag: "lyric" }],
        [{ text: "꿀 떨어진다", tag: "lyric" }],
        [{ text: "크롭티만 입었었지 빨간", tag: "lyric" }],
        [{ text: "몰랐었지 의미를 그땐", tag: "lyric" }],
        [{ text: "이제 새겨 다 커보니 알게 된", tag: "lyric" }],
        [{ text: "Famous saying my friend piglet ", tag: "cheer" }, { text: "(피글렛)", tag: "cue" }]
      ],
      [
        [{ text: "뚠뚠해봐 그래봤자 넘어가나 내가", tag: "lyric" }],
        [{ text: "조심해 그러다 너 꿀 떨어질라", tag: "lyric" }],
        [{ text: "What about me", tag: "cheer" }],
        [{ text: "어차피 나 좋아할 거 알고 있으니 뭐 ", tag: "lyric" }, { text: "(좋.아.해)", tag: "cue" }],
        [{ text: "가만가만히 눈을 감아 느껴", tag: "lyric" }],
        [{ text: "입술 그 맛 ", tag: "lyric" }, { text: "HONEY", tag: "cheer" }],
        [{ text: "더 달콤한 ", tag: "lyric" }, { text: "베어구미", tag: "cheer" }],
        [{ text: "윙윙", tag: "cheer" }, { text: " 호랑나비들도 모여", tag: "lyric" }],
        [{ text: "붕붕붕", tag: "cheer" }, { text: " 모두 조급해 보여", tag: "lyric" }],
        [{ text: "네가 네가 다가와 나를 볼 때마다", tag: "lyric" }],
        [{ text: "꿀 떨어진다 ", tag: "lyric" }, { text: "뚝뚝뚝", tag: "cheer" }],
        [{ text: "잘한다 잘한다", tag: "lyric" }],
        [{ text: "아이 예뻐 ", tag: "lyric" }, { text: "우쭈쭈쭈", tag: "cheer" }],
        [{ text: "쁨쁨쁨쁨 움직여", tag: "lyric" }],
        [{ text: "감히 넘볼 수 없는 그 zone", tag: "lyric" }],
        [{ text: "Don't say anymore ", tag: "lyric" }, { text: "Do Do Do", tag: "cheer" }],
        [{ text: "그러다가 나 다 놓칠라", tag: "lyric" }],
        [{ text: "다 줄 듯 말 듯 하게 ", tag: "lyric" }, { text: "다가가", tag: "cheer" }],
        [{ text: "다 줬다 뺏다 할래", tag: "lyric" }],
        [{ text: "모조리 다 나를 보고 눈빛에서 꿀이 ", tag: "lyric" }, { text: "(무.무.눈.에.꿀.이)", tag: "cue" }],
        [{ text: "다 잡은 물고기라 방심하다", tag: "lyric" }],
        [{ text: "크게 다칠 거야", tag: "lyric" }],
        [{ text: "섣불리 덤비지는 마", tag: "lyric" }],
        [{ text: "꿀 떨어진다", tag: "lyric" }],
        [{ text: "(2:28 꿀 떨어져 김용선 꿀 보이스 김용선 꿀 떨어져 무무도)", tag: "cue" }],
        [{ text: "쁨쁨쁨쁨 움직여", tag: "lyric" }],
        [{ text: "(꿀 떨어져 김용선 달다 달아 김용선 꿀 떨어져 무무도)", tag: "cue" }],
        [{ text: "꿀 떨어진다", tag: "lyric" }]
      ]
    ]
  },

  {
    id: "colors",
    order: 3,
    titleKr: "Colors",
    titleEn: "Colors",
    verified: true,
    columns: [
      [
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }],
        [{ text: "I walk like a model, people say oh", tag: "lyric" }],
        [{ text: "Who's that sexy thang", tag: "lyric" }],
        [{ text: "I see over there ", tag: "lyric" }, { text: "(Yeah that's me)", tag: "cue" }],
        [{ text: "Don't worry about it", tag: "lyric" }],
        [{ text: "Do the do the thang", tag: "lyric" }],
        [{ text: "Hey, just believe in yourself", tag: "lyric" }],
        [{ text: "What you want a do?", tag: "lyric" }],
        [{ text: "Just sing it out loud", tag: "lyric" }],
        [{ text: "Look in the mirror", tag: "cheer" }],
        [{ text: "And pose so damn fine and say it", tag: "lyric" }],
        [{ text: "I'm sick so bad", tag: "lyric" }],
        [{ text: "Louder louder", tag: "cheer" }],
        [{ text: "I'm ", tag: "lyric" }, { text: "sick", tag: "cheer" }, { text: ", I'm ", tag: "lyric" }, { text: "hot", tag: "cheer" }, { text: ", I'm ", tag: "lyric" }, { text: "gorgeous", tag: "cheer" }, { text: ", so bad", tag: "lyric" }],
        [{ text: "I want a ", tag: "lyric" }, { text: "black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " or ", tag: "lyric" }, { text: "purple", tag: "cheer" }],
        [{ text: "Black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " or ", tag: "lyric" }, { text: "purple", tag: "cheer" }],
        [{ text: "I want a ", tag: "lyric" }, { text: "black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " or ", tag: "lyric" }, { text: "purple", tag: "cheer" }],
        [{ text: "Black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " doesn't matter", tag: "lyric" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }],
        [{ text: "kick it up kick it up", tag: "lyric" }]
      ],
      [
        [{ text: "I walk like a model, people say oh", tag: "lyric" }],
        [{ text: "Who's that sexy thang", tag: "lyric" }],
        [{ text: "I see over there ", tag: "lyric" }, { text: "(Yeah that's me)", tag: "cue" }],
        [{ text: "Don't worry about it", tag: "lyric" }],
        [{ text: "Do the do the thang", tag: "lyric" }],
        [{ text: "Hey, just believe in yourself", tag: "lyric" }],
        [{ text: "What you want a do?", tag: "lyric" }],
        [{ text: "Just sing it out loud", tag: "lyric" }],
        [{ text: "Look in the mirror", tag: "cheer" }],
        [{ text: "And pose so damn fine and say it", tag: "lyric" }],
        [{ text: "I'm sick so bad", tag: "lyric" }],
        [{ text: "Louder louder", tag: "cheer" }],
        [{ text: "I'm ", tag: "lyric" }, { text: "sick", tag: "cheer" }, { text: ", I'm ", tag: "lyric" }, { text: "hot", tag: "cheer" }, { text: ", I'm ", tag: "lyric" }, { text: "gorgeous", tag: "cheer" }, { text: ", so bad", tag: "lyric" }],
        [{ text: "I want a ", tag: "lyric" }, { text: "black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " or ", tag: "lyric" }, { text: "purple", tag: "cheer" }],
        [{ text: "Black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " or ", tag: "lyric" }, { text: "purple", tag: "cheer" }],
        [{ text: "I want a ", tag: "lyric" }, { text: "black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " or ", tag: "lyric" }, { text: "purple", tag: "cheer" }],
        [{ text: "Black", tag: "cheer" }, { text: " and ", tag: "lyric" }, { text: "white", tag: "cheer" }, { text: " one and a ", tag: "lyric" }, { text: "pink", tag: "cheer" }, { text: " doesn't matter", tag: "lyric" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }],
        [{ text: "kick it up kick it up", tag: "lyric" }],
        [{ text: "kick it up kick it up kick it up kick it up", tag: "lyric" }],
        [{ text: "(Boom Boom Boom)", tag: "cue" }]
      ]
    ]
  },

  {
    id: "but-i",
    order: 4,
    titleKr: "But I",
    titleEn: "But I",
    verified: true,
    columns: [
      [
        [{ text: "(00:06 But I Love You 김용선!)", tag: "cue" }],
        [{ text: "핀 적도 없는 저 꽃 한 송이를 봐 봐", tag: "lyric" }],
        [{ text: "온기 하나 없는 저 끝 차디찬 바닥", tag: "lyric" }],
        [{ text: "아무 감정도, 아무 관심도 없는 네 눈빛에 말라", tag: "lyric" }],
        [{ text: "말라 비틀어진 날 보고도", tag: "lyric" }],
        [{ text: "단 한 번도 말 한마디 꺼낸 적 없지", tag: "lyric" }],
        [{ text: "아름다운 이별", tag: "lyric" }],
        [{ text: "아니 개나 줘버려", tag: "lyric" }],
        [{ text: "Everybody thinks I was happy, happy but I I I I", tag: "lyric" }],
        [{ text: "(솔.라.용.순.벗.아.이)", tag: "cue" }],
        [{ text: "Damn", tag: "lyric" }],
        [{ text: "I really ", tag: "lyric" }, { text: "hate you", tag: "cheer" }],
        [{ text: "착한 척은 집어치워", tag: "lyric" }],
        [{ text: "Oh oh oh I bloody hate you", tag: "cheer" }],
        [{ text: "You love me ", tag: "cheer" }, { text: "(yes!)", tag: "cue" }],
        [{ text: "거짓말은 집어치워", tag: "lyric" }],
        [{ text: "Oh oh oh you'd better shut up", tag: "cheer" }],
        [{ text: "Your ", tag: "lyric" }, { text: "body", tag: "cheer" }, { text: ", your ", tag: "lyric" }, { text: "money", tag: "cheer" }, { text: ", your ", tag: "lyric" }, { text: "face", tag: "cheer" }, { text: ", your ", tag: "lyric" }, { text: "vibe", tag: "cheer" }],
        [{ text: "Oh oh oh I really hate them", tag: "cheer" }],
        [{ text: "불쌍한 자 자비를 베푸소서 amen", tag: "lyric" }],
        [{ text: "친구들이 말해 미친 거 아니냐고", tag: "lyric" }],
        [{ text: "걔가 프로필 바꾼 거 다 봤냐고", tag: "lyric" }],
        [{ text: "I don't want to hear anything", tag: "lyric" }],
        [{ text: "Don't say anything", tag: "lyric" }],
        [{ text: "머리를 쓸어 넘겨", tag: "lyric" }],
        [{ text: "모든 기억도 같이 던져버릴 거니까", tag: "lyric" }],
        [{ text: "이제 당당히 걸어 다시 내가", tag: "lyric" }],
        [{ text: "I'll love myself", tag: "cheer" }]
      ],
      [
        [{ text: "Everybody thinks I'm not happy, happy but I I I I", tag: "lyric" }],
        [{ text: "(솔.라.용.순.벗.아.이)", tag: "cue" }],
        [{ text: "Huh", tag: "lyric" }],
        [{ text: "I really ", tag: "lyric" }, { text: "hate you", tag: "cheer" }],
        [{ text: "착한 척은 집어치워", tag: "lyric" }],
        [{ text: "Oh oh oh I bloody hate you", tag: "cheer" }],
        [{ text: "You love me ", tag: "cheer" }, { text: "(yes!)", tag: "cue" }],
        [{ text: "거짓말은 집어치워", tag: "lyric" }],
        [{ text: "Oh oh oh you'd better shut up", tag: "cheer" }],
        [{ text: "Your ", tag: "lyric" }, { text: "body", tag: "cheer" }, { text: ", your ", tag: "lyric" }, { text: "money", tag: "cheer" }, { text: ", your ", tag: "lyric" }, { text: "face", tag: "cheer" }, { text: ", your ", tag: "lyric" }, { text: "vibe", tag: "cheer" }],
        [{ text: "Oh oh oh I really hate them", tag: "cheer" }],
        [{ text: "다시 태어난 걸 감사해 amen", tag: "lyric" }],
        [{ text: "햇살 아래 활짝 핀 저 꽃 한 송이", tag: "lyric" }],
        [{ text: "다신 지지 않을 것처럼 피어나네", tag: "lyric" }],
        [{ text: "(함성)", tag: "cue" }]
      ]
    ]
  },

  /* 아래 2곡은 이번에 캡처 이미지가 없어 검증하지 못했습니다.
     기존 데이터를 새 스키마(줄 단위)로만 옮겨왔고, 각 줄에는
     응원/콜 segment만 있고 그 사이 검정 가사(lyric)는 누락되어
     있을 수 있습니다. 원본 캡처를 주시면 위 5곡처럼 마저 고칠 수 있어요. */

  {
    id: "want",
    order: 5,
    titleKr: "WANT",
    titleEn: "WANT",
    verified: true,
    columns: [
      [
        [{ text: "I'm ready to start", tag: "lyric" }],
        [{ text: "어디로든 Fly", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is what I WANT", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is what I WANT", tag: "lyric" }],
        [{ text: "What I WANT", tag: "cheer" }],
        [{ text: "Love is all my world", tag: "lyric" }],
        [{ text: "마음이 가는 그대로", tag: "lyric" }],
        [{ text: "Don't think too much", tag: "lyric" }],
        [{ text: "It's time to go", tag: "lyric" }],
        [{ text: "What do you WANT?", tag: "cheer" }],
        [{ text: "다른 건 신경 쓰지 마", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is coming up", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is coming up", tag: "lyric" }],
        [{ text: "Let's go!", tag: "cheer" }],
        [{ text: "Run at my pace", tag: "lyric" }],
        [{ text: "걸음을 떼", tag: "lyric" }],
        [{ text: "서툴더라도 난 I'm not afraid", tag: "lyric" }],
        [{ text: "You know I WANT it", tag: "lyric" }],
        [{ text: "I know you WANT it, ", tag: "lyric" }, { text: "Babe", tag: "cheer" }],
        [{ text: "고민 없이", tag: "lyric" }],
        [{ text: "Follow my lead", tag: "lyric" }],
        [{ text: "두 눈을 맞추고 한 걸음씩", tag: "lyric" }],
        [{ text: "사뿐히 걸어가 ", tag: "lyric" }, { text: "Never give it up!", tag: "cheer" }],
        [{ text: "(So give me that, Hur!)", tag: "lyric" }],
        [{ text: "I'm ready to start", tag: "lyric" }],
        [{ text: "어디로든 Fly", tag: "lyric" }],
        [{ text: "Love is what I WANT", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is what I WANT (I WANT)", tag: "lyric" }],
        [{ text: "빚을 비춘 ", tag: "lyric" }, { text: "Something", tag: "cheer" }],
        [{ text: "걱정 따윈 ", tag: "lyric" }, { text: "Nothing", tag: "cheer" }],
        [{ text: "Love is what you WANT", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is what you WANT", tag: "lyric" }],
        [{ text: "L O V E what I WANT", tag: "lyric" }],
        [{ text: "what I WANT, what I WANT!", tag: "cheer" }],
        [{ text: "L O V E what you WANT", tag: "lyric" }],
        [{ text: "what you WANT, what you WANT!", tag: "cheer" }],
        [{ text: "더 설레는 Scene이", tag: "lyric" }]
      ],
      [
        [{ text: "우리를 기다릴 테니", tag: "lyric" }],
        [{ text: "Love is all my world", tag: "lyric" }],
        [{ text: "Love is all my world", tag: "lyric" }],
        [{ text: "Love, Fall in love", tag: "cheer" }],
        [{ text: "알듯 말듯 해도 Baby let go, A-ha", tag: "lyric" }],
        [{ text: "Love, Only one", tag: "cheer" }],
        [{ text: "머릿속 꽃밭으로 둘이 함께 ", tag: "lyric" }, { text: "La-la-la", tag: "cheer" }],
        [{ text: "Be my baby oh, I can't wait for", tag: "lyric" }],
        [{ text: "이건 Melo 계속 Play on", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is coming up", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is coming up", tag: "lyric" }],
        [{ text: "You ready?", tag: "lyric" }],
        [{ text: "Look at my face", tag: "lyric" }],
        [{ text: "열까지 세", tag: "lyric" }],
        [{ text: "익숙한 모든 게 새롭게 Change", tag: "lyric" }],
        [{ text: "You know I WANT it", tag: "lyric" }],
        [{ text: "I know you WANT it, ", tag: "lyric" }, { text: "Babe", tag: "cheer" }],
        [{ text: "머리는 ", tag: "lyric" }, { text: "핑", tag: "cheer" }],
        [{ text: "두 볼은 ", tag: "lyric" }, { text: "Pink", tag: "cheer" }],
        [{ text: "숨 한번 내쉬고 Just come with me", tag: "lyric" }],
        [{ text: "박차고 걸어가 ", tag: "lyric" }, { text: "Baby wish me luck!", tag: "cheer" }],
        [{ text: "I'm ready to start", tag: "lyric" }],
        [{ text: "어디로든 Fly", tag: "lyric" }],
        [{ text: "Love is what I WANT", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is what I WANT (I WANT)", tag: "lyric" }],
        [{ text: "빚을 비춘 ", tag: "lyric" }, { text: "Something", tag: "cheer" }],
        [{ text: "걱정 따윈 ", tag: "lyric" }, { text: "Nothing", tag: "cheer" }],
        [{ text: "Love is what you WANT", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is what you WANT", tag: "lyric" }],
        [{ text: "L O V E what I WANT", tag: "lyric" }],
        [{ text: "what I WANT, what I WANT!", tag: "cheer" }],
        [{ text: "L O V E what you WANT", tag: "lyric" }],
        [{ text: "what you WANT, what you WANT!", tag: "cheer" }],
        [{ text: "더 설레는 Scene이", tag: "lyric" }],
        [{ text: "우리를 기다릴 테니", tag: "lyric" }],
        [{ text: "Love is all my world", tag: "lyric" }],
        [{ text: "Love is all my world", tag: "lyric" }],
        [{ text: "함께 써 내려갈 Days", tag: "lyric" }],
        [{ text: "그 첫 번째 페이지", tag: "lyric" }],
        [{ text: "첫 문장을 지금 시작해", tag: "lyric" }],
        [{ text: "아껴왔던 내 마음을 줄게", tag: "lyric" }],
        [{ text: "겁내지 말고 그냥 쭉", tag: "cheer" }],
        [{ text: "가보는 거야 우리 둘", tag: "cheer" }],
        [{ text: "Ready go Ready go ", tag: "lyric" }, { text: "(Let's fly up!)", tag: "cue" }],
        [{ text: "기분도 하늘로 ", tag: "lyric" }, { text: "(Let's ride up!)", tag: "cue" }],
        [{ text: "Have a secret talk", tag: "cheer" }],
        [{ text: "기대해 봐 우리 Happy End", tag: "cheer" }],
        [{ text: "Here we go Here we go ", tag: "lyric" }, { text: "(Let's fly up!)", tag: "cue" }],
        [{ text: "오늘도 내일도 ", tag: "lyric" }, { text: "(Let's ride up!)", tag: "cue" }],
        [{ text: "너에게 나 원하는 건 ", tag: "lyric" }, { text: "(함성)", tag: "cue" }],
        [{ text: "I'm ready to start", tag: "lyric" }],
        [{ text: "꿈꾸듯이 Fly", tag: "lyric" }],
        [{ text: "Love is all my world", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is all my world", tag: "lyric" }],
        [{ text: "서로를 담은 눈빛", tag: "lyric" }],
        [{ text: "요동치는 Heartbeat", tag: "lyric" }],
        [{ text: "Love is all your world", tag: "lyric" }],
        [{ text: "Lo-Lo-Love is all your world", tag: "lyric" }],
        [{ text: "L O V E what I WANT", tag: "lyric" }],
        [{ text: "what I WANT, what I WANT!", tag: "cheer" }],
        [{ text: "L O V E what you WANT", tag: "lyric" }],
        [{ text: "what you WANT, what you WANT!", tag: "cheer" }],
        [{ text: "L O V E what I WANT", tag: "lyric" }],
        [{ text: "what I WANT, what I WANT!", tag: "cheer" }],
        [{ text: "L O V E what you WANT", tag: "lyric" }],
        [{ text: "Love is all my world ", tag: "lyric" }, { text: "(함성)", tag: "cue" }]
      ]
    ]
  },

  {
    id: "floating-free",
    order: 6,
    titleKr: "Floating Free",
    titleEn: "Floating Free",
    verified: false,
    columns: [
      [
        [{ text: "(00:07 Floating Free!)", tag: "cue" }],
        [{ text: "我知道你在等我說", tag: "cheer" }],
        [{ text: "You & Me", tag: "cheer" }],
        [{ text: "We're Floating Free", tag: "cheer" }],
        [{ text: "需要萬分之一的運氣", tag: "cheer" }],
        [{ text: "You & Me", tag: "cheer" }],
        [{ text: "We're Floating Free", tag: "cheer" }]
      ],
      [
        [{ text: "You & Me", tag: "cheer" }],
        [{ text: "We're Floating Free", tag: "cheer" }],
        [{ text: "興奮的忘了呼吸", tag: "cheer" }],
        [{ text: "I'll be there for you", tag: "cheer" }],
        [{ text: "潮汐將我拉向你", tag: "cheer" }],
        [{ text: "(함성)", tag: "cue" }]
      ]
    ]
  },

  {
    id: "floating-free-korean-ver",
    order: 7,
    titleKr: "Floating Free (Korean Ver.)",
    titleEn: "Floating Free (Korean Ver.)",
    verified: false,
    columns: [
      [
        [{ text: "(00:07 Floating Free!)", tag: "cue" }],
        [{ text: "I don't care", tag: "cheer" }],
        [{ text: "You & Me", tag: "cheer" }],
        [{ text: "너의 하루 끝에 들려오는 이 멜로디", tag: "cheer" }],
        [{ text: "We're Floating Free", tag: "cheer" }],
        [{ text: "너와 나 바람이 되어", tag: "cheer" }],
        [{ text: "You & Me", tag: "cheer" }],
        [{ text: "We're Floating Free", tag: "cheer" }]
      ],
      [
        [{ text: "You & Me", tag: "cheer" }],
        [{ text: "다른 하늘 아래 같은 곳을 향해", tag: "cheer" }],
        [{ text: "내 마음을 띄워 보내 (닿을 듯 저 너머로)", tag: "cheer" }],
        [{ text: "(함성)", tag: "cue" }]
      ]
    ]
  }
];

if (typeof module !== "undefined") {
  module.exports = SONGS;
}
