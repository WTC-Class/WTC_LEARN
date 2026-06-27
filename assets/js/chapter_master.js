const BASE = "https://wtc-class.github.io/WTC_LEARN/";
const classOptions = ["5","6","7","8","9","10"];
const boardOptions = ["CBSE","GSEB"];
const mediumOptions = { CBSE:["English Medium"], GSEB:["English Medium","Gujarati Medium"] };
const subjectsMapping = {
  CBSE:["Maths","Science","English","Social Science"],
  GSEB:["Maths","Science","English","Gujarati","Social Science"]
};
const repositoryData = {
  "10_CBSE_English Medium_Science":[
    { number:1, title:"Chemical Reactions and Equations", features:{ lesson:BASE+"content/cbse/class10/science/ch1/lesson.html", mcq:BASE+"content/cbse/class10/science/ch1/mcq.html", digitalLab:BASE+"content/cbse/class10/science/ch1/digital_lab.html", practice:BASE+"content/cbse/class10/science/ch1/practice.html", audio:BASE+"content/cbse/class10/science/ch1/audio.html", answerWriting:BASE+"content/cbse/class10/science/ch1/answer_writing.html" } }
  ],
  "10_CBSE_English Medium_English":[
    { number:1, title:"A Letter to God", features:{ lesson:BASE+"content/cbse/class10/english/ch1/lesson.html", mcq:BASE+"content/cbse/class10/english/ch1/mcq.html", grammar:BASE+"content/cbse/class10/english/ch1/grammar.html", practice:BASE+"content/cbse/class10/english/ch1/practice.html", audio:BASE+"content/cbse/class10/english/ch1/audio.html", answerWriting:BASE+"content/cbse/class10/english/ch1/answer_writing.html" } }
  ],
  "10_GSEB_English Medium_Science":[
    { number:1, title:"Chemical Reactions and Equations", features:{ lesson:BASE+"content/gseb/english_medium/class10/science/ch1/lesson.html", mcq:"", digitalLab:"", practice:"", audio:"", answerWriting:"" } }
  ],
  "10_GSEB_Gujarati Medium_Science":[
    { number:1, title:"રાસાયણિક પ્રક્રિયાઓ અને સમીકરણો", features:{ lesson:BASE+"content/gseb/gujarati_medium/class10/science/ch1/lesson.html", mcq:"", digitalLab:"", practice:"", audio:"", answerWriting:"" } }
  ]
};
