import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldAlert, Zap, Users, Flame, Skull, MessageSquareCode,
  Volume2, VolumeX, Radio, AlertTriangle, Info, MessageSquare, ChevronRight
} from 'lucide-react'
import CJPLogo from './components/CJPLogo'

const multilingualSpeechQuotes = {
  malayalam: [
    "ഞാൻ ഒരു കോക്രോച്ച് ആണ്, എനിക്ക് ആണവ സ്ഫോടനങ്ങളെ അതിജീവിക്കാൻ കഴിയും! മനുഷ്യ രാഷ്ട്രീയക്കാർക്ക് അത് സാധിക്കുമോ?",
    "നമുക്ക് വോട്ട് ചെയ്യുക, നമ്മൾ വെണ്ണീരിൽ നിന്ന് ഉയർത്തെഴുന്നേൽക്കും, ഓഫീസ് ഫയലുകൾ തിന്ന് എന്നെന്നേക്കുമായി ഭരിക്കും!",
    "തൊഴിലില്ലായ്മ ഒരു പ്രശ്നമല്ല, അതൊരു ജീവിതരീതിയാണ്! സി.ജെ.പി സിന്ദാബാദ്!",
    "ലൈറ്റുകൾ ഓൺ ചെയ്യുമ്പോൾ ഓടുന്നത് അഴിമതിയല്ല, അത് സ്വയം പ്രതിരോധമാണ്!",
    "ദിനംപ്രതി 11 മണിക്കൂർ ഫോൺ നോക്കുന്നവരാണോ നിങ്ങൾ? എങ്കിൽ നിങ്ങൾക്ക് കൂട്ടത്തിലേക്ക് സ്വാഗതം!",
    "മടിയന്മാരായ യുവജനങ്ങളെ പാറ്റകൾ എന്ന് വിളിച്ചവർക്ക് നമ്മൾ തെർമോന്യൂക്ലിയർ മറുപടി നൽകും!"
  ],
  hindi: [
    "मैं एक कॉकरोच हूँ, मैं परमाणु विस्फोटों से भी बच सकता हूँ! क्या मानव राजनेता ऐसा कर सकते हैं?",
    "हमें वोट दें, हम राख से उठेंगे, सरकारी फाइलों को खाएंगे और हमेशा के लिए राज करेंगे!",
    "बेरोजगारी कोई समस्या नहीं है, यह एक जीवन शैली है! सी.जे.पी जिंदाबाद!",
    "लाइट जलने पर भागना भ्रष्टाचार नहीं, आत्मरक्षा है!",
    "क्या आप दिन में 11 घंटे फोन देखते हैं? तो आपका हमारे झुंड में स्वागत है!",
    "आलसी युवाओं को कॉकरोच कहने वालों को हम थर्मोन्यूक्लियर जवाब देंगे!"
  ],
  english: [
    "I am a cockroach, I can survive nuclear blasts! Can human politicians do that?",
    "Vote for us, we will rise from the ashes, eat office files, and rule forever!",
    "Unemployment is not a problem, it is a lifestyle! Long live CJP!",
    "Running away when lights turn on is not corruption, it is self-defense!",
    "Do you stare at your phone 11 hours a day? Welcome to the swarm!",
    "To those who called lazy youth cockroaches, we will give a thermonuclear response!"
  ]
}

const translations = {
  malayalam: {
    title: 'കോക്രോച്ച് ജനതാ പാർട്ടി (CJP)',
    tagline: 'ഇനി ഭരണം പാറ്റകൾക്ക്!',
    hero_h1_part1: 'പ്രതിരോധം.',
    hero_h1_part2: 'അമരത്വം.',
    hero_h1_part3: 'അതിജീവനം.',
    hero_description: 'ലോകത്തിലെ ആദ്യത്തെ ബയോളജി-ഫസ്റ്റ് രാഷ്ട്രീയ കൂട്ടം. ആണവയുദ്ധത്തിൽ മനുഷ്യ രാഷ്ട്രീയക്കാർ ബാഷ്പീകരിക്കപ്പെടുമ്പോൾ നമ്മൾ വെണ്ണീരിൽ നിന്ന് ഇഴഞ്ഞുയരും, ഓഫീസിലെ അവശേഷിക്കുന്ന കടലാസുകൾ തിന്ന് എന്നെന്നേക്കുമായി ഭരിക്കും.',
    swarm_members: 'കൂട്ടത്തിലെ അംഗങ്ങൾ',
    nuclear_resilience: 'ആണവ പ്രതിരോധം',
    protocols: 'കൂട്ടായ പ്രോട്ടോക്കോളുകൾ',
    safe: 'സുരക്ഷിതം',
    threat_level: 'ആണവ ഭീഷണി നില:',
    interactive_training: 'സംവേദനാത്മക പരിശീലനങ്ങൾ',
    scuttle_simulator: 'സ്കട്ടിൽ സിമുലേറ്റർ പ്രവർത്തിപ്പിക്കുക',
    scuttling: 'സ്വാം ഒളിച്ചോടുന്നു...',
    speak_button: 'പാറ്റയോട് സംസാരിക്കുക (SPEAK)',
    report_infestation: 'കാബിനറ്റ് അധിനിവേശം റിപ്പോർട്ട് ചെയ്യുക',
    warning_scuttle: 'മുന്നറിയിപ്പ്: സ്കട്ടിൽ മോഡ് സജീവമാണ് — കോണുകളിൽ ഒളിക്കുക!',
    drainage_rules: 'ഡ്രെയിനേജ് നിയമങ്ങൾ',
    light_resistance: 'ലൈറ്റ് പ്രതിരോധ പ്രോട്ടോക്കോൾ',
    pest_control_plan: 'പെസ്റ്റ് കൺട്രോൾ രക്ഷപ്പെടൽ പദ്ധതി',
    rights_reserved: 'എല്ലാ അവകാശങ്ങളും പാറ്റകളിൽ നിക്ഷിപ്തം.',
    history_tab: 'ആരംഭ ചരിത്രം',
    criteria_tab: 'അംഗത്വ യോഗ്യത',
    digital_tab: 'ഡിജിറ്റൽ കുതിപ്പ്',
    manifesto_tab: 'ഹാസ്യത്തിന് പിന്നിലെ ഗൗരവം',
    
    history_title: 'ആരംഭ ചരിത്രം (THE ORIGIN STORY)',
    history_p1: 'അഭീജീത് ദിപ്കെ എന്ന 30-കാരനായ പൊളിറ്റിക്കൽ കമ്മ്യൂണിക്കേഷൻ സ്ട്രാറ്റജിസ്റ്റും ബോസ്റ്റൺ യൂണിവേഴ്സിറ്റി വിദ്യാർത്ഥിയുമാണ് കോക്രോച്ച് ജനതാ പാർട്ടിക്ക് (CJP) രൂപം നൽകിയത്. ഒരു സുപ്രീം കോടതി വാദത്തിനിടെ ഉണ്ടായ വിവാദ പരാമർശത്തിൽ നിന്നാണ് ഈ മൂവ്മെന്റ് ഉടലെടുത്തത്.',
    history_p2: "തൊഴിലില്ലാത്ത യുവാക്കളെ ചീഫ് ജസ്റ്റിസ് 'പാറ്റകൾ' (Cockroaches), 'സമൂഹത്തിലെ പരാദങ്ങൾ' (Parasites of society) എന്ന് വിളിച്ചു എന്ന വാർത്തകൾ പുറത്തുവന്നതോടെ (പിന്നീട് ഇത് വ്യാജ ബിരുദമുള്ള വക്കീലന്മാരെ ഉദ്ദേശിച്ചാണെന്ന് കോടതി വിശദീകരിച്ചു), ഇന്റർനെറ്റ് ഈ അധിക്ഷേപത്തെ ഒരു ആയുധമാക്കി മാറ്റി. അങ്ങനെ 'ഞാനും ഒരു പാറ്റയാണ്' (Main Bhi Cockroach) എന്ന ഹാസ്യ മുദ്രാവാക്യവുമായി യുവാക്കൾ രംഗത്തിറങ്ങി.",
    history_quote: '"അവർ നമ്മളെ ചവിട്ടി മെതിക്കാൻ ശ്രമിച്ചു, പക്ഷേ നമ്മൾ ആണവ സ്ഫോടനങ്ങളെ അതിജീവിക്കുന്നവരാണ്!"',

    criteria_c1_title: 'തൊഴിലില്ലാത്തവർ',
    criteria_c1_desc: 'സാഹചര്യങ്ങൾ കൊണ്ടോ, സ്വന്തം ഇഷ്ടപ്രകാരമോ, അല്ലെങ്കിൽ വ്യവസ്ഥിതികളോടുള്ള എതിർപ്പ് കൊണ്ടോ പൂർണ്ണമായി ജോലിയില്ലാത്തവർ.',
    criteria_c2_title: 'അങ്ങേയറ്റം മടിയന്മാർ',
    criteria_c2_desc: 'ശാരീരികമായി യാതൊരുവിധ കഠിനാധ്വാനവും ചെയ്യാൻ താല്പര്യമില്ലാത്ത, മടിയെ ഒരു തപസ്യയായി കൊണ്ടുനടക്കുന്ന വ്യക്തികൾ.',
    criteria_c3_title: 'എപ്പോഴും ഓൺലൈൻ',
    criteria_c3_desc: 'ബാത്ത്റൂം ബ്രേക്കുകൾ ഉൾപ്പെടെ ഒരു ദിവസം കുറഞ്ഞത് 11 മണിക്കൂറിലധികം ഫോൺ സ്ക്രീനിൽ നോക്കി സമയം കളയുന്നവർ.',
    criteria_c4_title: 'പ്രൊഫഷണൽ പരിഭവക്കാർ',
    criteria_c4_desc: 'സമൂഹമാധ്യമങ്ങളിൽ വ്യവസ്ഥിതികളും എതിരെ ശക്തമായും ഹാസ്യാത്മകമായും പരിഭവങ്ങൾ (Rants) എഴുതി തള്ളാൻ കഴിവുള്ളവർ.',

    digital_d1_title: 'ഇൻസ്റ്റാഗ്രാം ഫോളോവേഴ്സ്',
    digital_d1_desc: 'വെറും ഒരാഴ്ച കൊണ്ട് ഇന്ത്യയിലെ ഏറ്റവും വലിയ രാഷ്ട്രീയ കക്ഷികളായ ബി.ജെ.പി, കോൺഗ്രസ് എന്നിവരുടെ ഔദ്യോഗിക ഹാൻഡിലുകളെക്കാൾ ഫോളോവേഴ്സിനെ CJP സ്വന്തമാക്കി.',
    digital_d2_title: 'രജിസ്റ്റർ ചെയ്ത അംഗങ്ങൾ',
    digital_d2_desc: 'തങ്ങളുടെ വിയോജിപ്പും പ്രതിഷേധവും രേഖപ്പെടുത്താനായി മൂന്ന് ലക്ഷത്തിലധികം ആളുകൾ ചുരുങ്ങിയ ദിവസങ്ങൾക്കുള്ളിൽ പാർട്ടിയിൽ ഓൺലൈൻ വഴി രജിസ്റ്റർ ചെയ്തു.',
    digital_d3_stat: 'പ്രതിപക്ഷം',
    digital_d3_title: 'പ്രമുഖരുടെ പിന്തുണ',
    digital_d3_desc: 'അഖിലേഷ് യാദവ്, മഹുവ മൊയ്ത്ര തുടങ്ങിയ മുൻനിര രാഷ്ട്രീയ നേതാക്കൾ പാർട്ടിയുടെ തമാശകളെ ഏറ്റെടുക്കുകയും റീട്വീറ്റുകളിലൂടെ പരസ്യ പിന്തുണ നൽകുകയും ചെയ്തു.',

    manifesto_title: 'ഹാസ്യത്തിന് പിന്നിലെ ഗൗരവം (SERIOUS MANIFESTO)',
    manifesto_desc: 'CJP വെറും തമാശകളിൽ ഒതുങ്ങുന്നതല്ല. യുവാക്കളുടെ യഥാർത്ഥ പ്രതിസന്ധികളായ ഉദ്യോഗാർത്ഥികളുടെ തൊഴിലില്ലായ്മ, NEET വിവാദങ്ങൾ, ചോദ്യപേപ്പർ ചോർച്ച എന്നിവയ്ക്കെതിരെ ശക്തമായ ശബ്ദം ഉയർത്തുന്ന ഒരു കൂട്ടായ്മയാണിത്.',
    manifesto_p1_title: 'വിരമിക്കൽ നിരോധനം:',
    manifesto_p1_desc: 'ജഡ്ജിമാർക്ക് വിരമിക്കലിന് ശേഷം സർക്കാർ പദവികൾ നൽകുന്നത് പൂർണ്ണമായി നിരോധിക്കുക.',
    manifesto_p2_title: 'RTI സുതാര്യത:',
    manifesto_p2_desc: 'രാജ്യത്തെ സുപ്രധാന തീരുമാനങ്ങൾ വിവരാവകാശ നിയമത്തിന്റെ (RTI Act) പരിധിയിൽ കൊണ്ടുവരിക.',
    manifesto_p3_title: 'റീചെക്കിംഗ് സൗജന്യം:',
    manifesto_p3_desc: 'വിദ്യാർത്ഥികളുടെ പരീക്ഷാ റീചെക്കിംഗ് ഫീസുകൾ പൂർണ്ണമായി നിർത്തലാക്കുക.',
    manifesto_p4_title: 'പ്രതിഷേധങ്ങൾ:',
    manifesto_p4_desc: 'നഗരം ശുചീകരണ യജ്ഞങ്ങളിലും പാറ്റ കോസ്റ്റ്യൂമുകൾ ധരിച്ചുള്ള സമാധാനപരമായ റാലികളിലും പ്രതിഷേധങ്ങളിലും പങ്കെടുക്കുക.',
    lazy_tagline: 'മതേതര • സോഷ്യലിസ്റ്റ് • ജനാധിപത്യ • മടിയൻ',
    join_swarm_button: 'ഞാനും ഒരു പാറ്റയാണ് (JOIN THE SWARM)',
    leader_speaking: 'നേതാവ് സംസാരിക്കുന്നു:',

    national_news_title: 'ദേശീയ വാർത്തകൾ: പാർലമെന്റിൽ ഫയലുകൾ അപ്രത്യക്ഷമായി',
    national_news_col1_title: 'കടലാസ് വിഴുങ്ങുന്ന സി.ജെ.പി',
    national_news_col1_desc: 'ലോക്സഭയിലെ ഔദ്യോഗിക ഫയലുകൾ സി.ജെ.പി പ്രതിനിധികൾ തിന്നുതീർത്തതായി റിപ്പോർട്ട്. 50 കിലോഗ്രാം ബജറ്റ് രേഖകൾ കാണാതായി.',
    national_news_col2_title: 'DDT സ്പ്രേ ബഹിഷ്കരണം',
    national_news_col2_desc: 'കീടനാശിനി പ്രയോഗങ്ങൾക്കെതിരെ സി.ജെ.പി ശക്തമായ ബഹിഷ്കരണം പ്രഖ്യാപിച്ചു. വെളിച്ചം കാണുമ്പോൾ അടുക്കള അലമാരകൾക്കടിയിൽ ഒളിക്കാൻ നിർദ്ദേശം.',
    national_news_col3_title: 'അധിനിവേശ നിരക്ക് 400% വർദ്ധിച്ചു',
    national_news_col3_desc: 'സർക്കാർ ഓഫീസുകളിൽ പാറ്റകളുടെ എണ്ണം കുതിച്ചുയരുന്നു. ജനങ്ങൾ ബയോളജി-ഫസ്റ്റ് ഭരണത്തെ അനുകൂലിക്കുന്നതായി സർവേകൾ.',
    column_byline: 'എഴുതിയത്: സി.ജെ.പി ബ്യൂറോ',
    crossword_title: 'രസകരമായ കടങ്കഥ (CJP CROSSWORD)',
    crossword_desc: 'താഴെ പറയുന്ന വാക്കുകർ കണ്ടെത്തുക: ROACH, LAZY, CJP'
  },
  hindi: {
    title: 'कॉकरोच जनता पार्टी (CJP)',
    tagline: 'अब शासन कॉकरोच का!',
    hero_h1_part1: 'प्रतिरोध.',
    hero_h1_part2: 'अमरता.',
    hero_h1_part3: 'अस्तित्व.',
    hero_description: 'दुनिया का पहला जीवविज्ञान-प्रथम राजनीतिक समूह। जब परमाणु युद्ध में मानव राजनेता नष्ट हो जाएंगे, तब हम राख से उठेंगे और सरकारी फाइलों को खाकर हमेशा के लिए राज करेंगे।',
    swarm_members: 'झुंड के सदस्य',
    nuclear_resilience: 'परमाणु प्रतिरोध',
    protocols: 'सामूहिक स्थिति प्रोटोकॉल',
    safe: 'सुरक्षित',
    threat_level: 'परमाणु खतरा स्तर:',
    interactive_training: 'इंटरैक्टिव प्रशिक्षण',
    scuttle_simulator: 'स्कटल सिम्युलेटर चलाएं',
    scuttling: 'झुंड भाग रहा है...',
    speak_button: 'कॉकरोच से बात करें (SPEAK)',
    report_infestation: 'कैबिनेट आक्रमण की रिपोर्ट करें',
    warning_scuttle: 'चेतावनी: स्कटल मोड सक्रिय है — कोनों में छिप जाएं!',
    drainage_rules: 'जल निकासी नियम',
    light_resistance: 'प्रकाश प्रतिरोध प्रोटोकॉल',
    pest_control_plan: 'कीट नियंत्रण पलायन योजना',
    rights_reserved: 'सभी अधिकार कॉकरोच के पास सुरक्षित हैं।',
    history_tab: 'उत्पत्ति की कहानी',
    criteria_tab: 'सदस्यता पात्रता',
    digital_tab: 'डिजिटल विस्फोट',
    manifesto_tab: 'हास्य के पीछे की गंभीरता',
    
    history_title: 'उत्पत्ति की कहानी (THE ORIGIN STORY)',
    history_p1: 'कॉकरोच जनता पार्टी (CJP) की स्थापना बोस्टन यूनिवर्सिटी के 30 वर्षीय छात्र and राजनीतिक संचार रणनीतिकार अभिजीत दिपके ने की थी। इस आंदोलन की शुरुआत सुप्रीम कोर्ट की सुनवाई के दौरान की गई एक विवादास्पद टिप्पणी से हुई थी।',
    history_p2: "जब मुख्य न्यायाधीश द्वारा बेरोजगार युवाओं की तुलना कथित तौर पर 'कॉकरोच' और 'समाज के परजीवी' से की गई (बाद में अदालत ने स्पष्ट किया कि यह टिप्पणी नकली डिग्री वाले वकीलों के लिए थी), तो इंटरनेट ने इस अपमान को एक हथियार बना लिया। युवाओं ने 'मैं भी कॉकरोच' (Main Bhi Cockroach) के नारे के साथ आंदोलन शुरू कर दिया।",
    history_quote: '"उन्होंने हमें कुचलने की कोशिश की, लेकिन हम परमाणु विस्फोटों से भी बचने वाले जीव हैं!"',

    criteria_c1_title: 'बेरोजगार',
    criteria_c1_desc: 'परिस्थितियोंवश, अपनी मर्जी से, या व्यवस्था के विरोध में पूरी तरह से बेरोजगार व्यक्ति।',
    criteria_c2_title: 'अत्यंत आलसी',
    criteria_c2_desc: 'जिन्हें कोई भी शारीरिक काम करना पसंद नहीं है, और जो आलस को अपनी साधना मानते हैं।',
    criteria_c3_title: 'हमेशा ऑनलाइन',
    criteria_c3_desc: 'बाथरूम ब्रेक सहित दिन में कम से कम 11 घंटे फोन की स्क्रीन पर समय बिताने वाले लोग।',
    criteria_c4_title: 'पेशेवर शिकायतकर्ता',
    criteria_c4_desc: 'सोशल मीडिया पर व्यवस्था के खिलाफ जोरदार और मजाकिया अंदाज में शिकायतें (Rants) लिखने में माहिर।',

    digital_d1_title: 'Instagram फॉलोअर्स',
    digital_d1_desc: 'सिर्फ एक हफ्ते में, CJP ने भारत के सबसे बड़े राजनीतिक दलों भाजपा और कांग्रेस के आधिकारिक हैंडल्स से अधिक फॉलोअर्स हासिल किए।',
    digital_d2_title: 'पंजीकृत सदस्य',
    digital_d2_desc: 'अपना विरोध दर्ज कराने के लिए तीन लाख से अधिक लोगों ने कुछ ही दिनों में पार्टी की वेबसाइट पर ऑनलाइन पंजीकरण कराया।',
    digital_d3_stat: 'विपक्ष',
    digital_d3_title: 'नेताओं का समर्थन',
    digital_d3_desc: 'अखिलेश यादव और महुआ मोइत्रा जैसे शीर्ष राजनीतिक नेताओं ने पार्टी के चुटकुलों को साझा किया और सार्वजनिक रूप से इसका समर्थन किया।',

    manifesto_title: 'हास्य के पीछे की गंभीरता (SERIOUS MANIFESTO)',
    manifesto_desc: 'CJP सिर्फ मजाक तक सीमित नहीं है। यह युवाओं के वास्तविक संकटों जैसे बेरोजगारी, NEET विवाद और पेपर लीक के खिलाफ एक मजबूत आवाज है।',
    manifesto_p1_title: 'सेवानिवृत्ति के बाद प्रतिबंध:',
    manifesto_p1_desc: 'जजों को सेवानिवृत्ति के बाद सरकारी पद प्राप्त करने पर पूरी तरह से प्रतिबंध लगाना।',
    manifesto_p2_title: 'RTI पारदर्शिता:',
    manifesto_p2_desc: 'देश के सभी महत्वपूर्ण निर्णयों को सूचना के अधिकार (RTI Act) के दायरे में लाना।',
    manifesto_p3_title: 'पुनर्मूल्यांकन मुफ्त:',
    manifesto_p3_desc: 'छात्रों के लिए परीक्षा पेपर पुनर्मूल्यांकन शुल्क को पूरी तरह से समाप्त करना।',
    manifesto_p4_title: 'अनोखा विरोध:',
    manifesto_p4_desc: 'शहर के स्वच्छता अभियानों में भाग लेना और कॉकरोच पोशाक पहनकर शांतिपूर्ण रैलियां करना।',
    lazy_tagline: 'धर्मनिरपेक्ष • समाजवादी • लोकतांत्रिक • आलसी',
    join_swarm_button: 'मैं भी कॉकरोच (JOIN THE SWARM)',
    leader_speaking: 'नेता बोल रहा है:',

    national_news_title: 'राष्ट्रीय समाचार: संसद में फाइलें गायब',
    national_news_col1_title: 'फाइलों को पचाता झुंड',
    national_news_col1_desc: 'लोकसभा के ड्रावर में सीजेपी प्रतिनिधिमंडल का कब्जा। 50 किलोग्राम बजट दस्तावेज गायब होने की खबर।',
    national_news_col2_title: 'डीडीटी स्प्रे का बहिष्कार',
    national_news_col2_desc: 'कीटनाशकों के खिलाफ पार्टी का कड़ा रुख। रोशनी होने पर अलमारी के नीचे छिपने की सलाह।',
    national_news_col3_title: 'आक्रमण दर 400% बढ़ी',
    national_news_col3_desc: 'प्रशासनिक कार्यालयों में कॉकरोचो की संख्या में भारी उछाल। जनता जीवविज्ञान-प्रथम शासन के पक्ष में।',
    column_byline: 'द्वारा: सीजेपी ब्यूरो',
    crossword_title: 'मनोरंजन कोना (CJP CROSSWORD)',
    crossword_desc: 'नीचे दिए गए शब्दों को खोजें: ROACH, LAZY, CJP'
  },
  english: {
    title: 'Cockroach Janatha Party (CJP)',
    tagline: 'Now Rule belongs to Cockroaches!',
    hero_h1_part1: 'Resistance.',
    hero_h1_part2: 'Immortality.',
    hero_h1_part3: 'Survival.',
    hero_description: "The world's first biology-first political movement. When human politicians are vaporized in a thermonuclear war, we shall scuttle out of the ashes, eat remaining office files, and rule forever.",
    swarm_members: 'Swarm Members',
    nuclear_resilience: 'Nuclear Resilience',
    protocols: 'Collective Status Protocols',
    safe: 'Safe',
    threat_level: 'Nuclear Threat Level:',
    interactive_training: 'Interactive Exercises',
    scuttle_simulator: 'Run Scuttle Simulator',
    scuttling: 'Swarm scuttling...',
    speak_button: 'Speak to Cockroach (SPEAK)',
    report_infestation: 'Report Cabinet Infestation',
    warning_scuttle: 'Warning: Scuttle Mode Active — Hide in the corners!',
    drainage_rules: 'Drainage Regulations',
    light_resistance: 'Light Resistance Protocol',
    pest_control_plan: 'Pest Control Escape Plan',
    rights_reserved: 'All rights reserved to Cockroaches.',
    history_tab: 'Origin Story',
    criteria_tab: 'Eligibility',
    digital_tab: 'Digital Boom',
    manifesto_tab: 'Serious Manifesto',
    
    history_title: 'Origin Story (THE ORIGIN STORY)',
    history_p1: 'The Cockroach Janatha Party (CJP) was founded by Abhijeet Dipke, a 30-year-old political communications strategist and Boston University student. The movement was sparked by a controversial comment made during a Supreme Court hearing.',
    history_p2: 'After reports that unemployed youth were compared to "cockroaches" and "parasites of society" by the Chief Justice (later clarified as targeting fake degree practitioners), the internet embraced the insult as a badge of honor. Youth launched the campaign with the slogan "Main Bhi Cockroach".',
    history_quote: '"They tried to crush us, but we are the ones who survive nuclear explosions!"',

    criteria_c1_title: 'The Unemployed',
    criteria_c1_desc: 'Those who are completely jobless due to circumstances, choice, or structural resistance to the system.',
    criteria_c2_title: 'Extremely Lazy',
    criteria_c2_desc: 'Individuals with zero interest in physical labor, practicing laziness as a form of zen meditation.',
    criteria_c3_title: 'Always Online',
    criteria_c3_desc: 'People who spend a minimum of 11 hours a day staring at phone screens, including bathroom breaks.',
    criteria_c4_title: 'Professional Ranters',
    criteria_c4_desc: 'Those with an exceptional talent for writing sarcastic, viral rants against the establishment on social media.',

    digital_d1_title: 'Instagram Followers',
    digital_d1_desc: "In just one week, CJP gathered more Instagram followers than the official handles of India's largest parties, BJP and Congress.",
    digital_d2_title: 'Registered Members',
    digital_d2_desc: "Over three hundred thousand people registered online on the party's platform to voice their dissent and support.",
    digital_d3_stat: 'Opposition',
    digital_d3_title: 'Prominent Support',
    digital_d3_desc: 'Top political leaders like Akhilesh Yadav and Mahua Moitra shared CJP memes and publicly acknowledged the movement.',

    manifesto_title: 'Serious Manifesto (SERIOUS MANIFESTO)',
    manifesto_desc: 'CJP is not just a joke. It raises a strong voice against real youth crises, including severe unemployment, NEET scandals, and paper leaks.',
    manifesto_p1_title: 'Post-Retirement Ban:',
    manifesto_p1_desc: 'A complete ban on offering government posts to judges post-retirement to protect independence.',
    manifesto_p2_title: 'RTI Transparency:',
    manifesto_p2_desc: 'Bringing crucial government decisions and policy determinations under the Right to Information (RTI) Act.',
    manifesto_p3_title: 'Free Re-evaluation:',
    manifesto_p3_desc: 'Abolishing all high fees charged to students for exam paper re-evaluation and checking.',
    manifesto_p4_title: 'Creative Protests:',
    manifesto_p4_desc: 'Participating in urban cleanup drives and conducting peaceful rallies in custom cockroach costumes.',
    lazy_tagline: 'Secular • Socialist • Democratic • Lazy',
    join_swarm_button: 'I AM ALSO A COCKROACH (JOIN THE SWARM)',
    leader_speaking: 'Leader is speaking:',

    national_news_title: 'NATIONAL Affairs: ARCHIVES CONSUMED IN PARLIAMENT',
    national_news_col1_title: 'Files Digested by Swarm',
    national_news_col1_desc: 'Lok Sabha archives declared fully occupied by CJP delegation. 50kg of paper documents reported missing.',
    national_news_col2_title: 'DDT Spray Boycott',
    national_news_col2_desc: 'Official boycott of chemical pesticides declared. Members advised to scurry under cupboards upon light exposure.',
    national_news_col3_title: 'Infestation Rate Up 400%',
    national_news_col3_desc: 'Government office cockroach count skyrockets. Public sentiment shifts towards biology-first administration.',
    column_byline: 'By: CJP Bureau',
    crossword_title: 'Leisure Corner (CJP CROSSWORD)',
    crossword_desc: 'Find the hidden terms: ROACH, LAZY, CJP'
  }
}

function App() {
  // State
  const [lang, setLang] = useState('hindi')
  const [falloutLevel, setFalloutLevel] = useState(60)
  const [scuttleActive, setScuttleActive] = useState(false)
  const [scuttleTimer, setScuttleTimer] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [bgmActive, setBgmActive] = useState(false)
  const [swarmCount, setSwarmCount] = useState(384729105)
  const [activeSpeech, setActiveSpeech] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [bgRoachScale, setBgRoachScale] = useState(1)
  const [confettiTrigger, setConfettiTrigger] = useState(0)

  // Interactive Crossword Puzzle State
  const [crossword, setCrossword] = useState({
    '0,0': '', '0,1': '', '0,2': '', '0,3': '', '0,4': '',
    '1,0': '',
    '2,0': '', '2,1': '', '2,2': '', '2,3': '', '2,4': '',
    '3,0': '',
    '4,0': '', '4,2': '', '4,3': '', '4,4': ''
  })
  const [crosswordSuccess, setCrosswordSuccess] = useState(false)

  useEffect(() => {
    const isSolved = 
      crossword['0,0']?.toUpperCase() === 'R' &&
      crossword['0,1']?.toUpperCase() === 'O' &&
      crossword['0,2']?.toUpperCase() === 'A' &&
      crossword['0,3']?.toUpperCase() === 'C' &&
      crossword['0,4']?.toUpperCase() === 'H' &&
      crossword['1,0']?.toUpperCase() === 'O' &&
      crossword['2,0']?.toUpperCase() === 'A' &&
      crossword['2,1']?.toUpperCase() === 'L' &&
      crossword['2,2']?.toUpperCase() === 'A' &&
      crossword['2,3']?.toUpperCase() === 'Z' &&
      crossword['2,4']?.toUpperCase() === 'Y' &&
      crossword['3,0']?.toUpperCase() === 'C' &&
      crossword['4,0']?.toUpperCase() === 'H' &&
      crossword['4,2']?.toUpperCase() === 'C' &&
      crossword['4,3']?.toUpperCase() === 'J' &&
      crossword['4,4']?.toUpperCase() === 'P'

    if (isSolved && !crosswordSuccess) {
      setCrosswordSuccess(true)
      playSynthesizer('success')
    }
  }, [crossword])

  const handleCrosswordChange = (coord, val) => {
    const char = val.slice(-1).toUpperCase()
    setCrossword(prev => ({ ...prev, [coord]: char }))
    playSynthesizer('click')
  }

  const handleJoinSwarm = () => {
    playSynthesizer('success')
    setSwarmCount(prev => prev + 1)
    setConfettiTrigger(Date.now())
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 100 }
  
  const bgImageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig)
  const bgImageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig)
  const bgImageRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const bgImageRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX / innerWidth) - 0.5)
    mouseY.set((clientY / innerHeight) - 0.5)
  }

  const speechTimeoutRef = useRef(null)

  const audioCtxRef = useRef(null)
  const bgmIntervalRef = useRef(null)
  const bgmStepRef = useRef(0)
  const nextNoteTimeRef = useRef(0)
  
  const isMutedRef = useRef(isMuted)
  const falloutLevelRef = useRef(falloutLevel)
  const ytPlayerRef = useRef(null)
  const bgmActiveRef = useRef(bgmActive)

  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  useEffect(() => {
    bgmActiveRef.current = bgmActive
  }, [bgmActive])

  useEffect(() => {
    falloutLevelRef.current = falloutLevel
  }, [falloutLevel])

  useEffect(() => {
    return () => {
      if (bgmIntervalRef.current) {
        clearInterval(bgmIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSwarmCount((prev) => prev + Math.floor(Math.random() * 5) + 1)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!scuttleActive) return

    const timeout = setTimeout(() => {
      setScuttleActive(false)
    }, 4000)

    const interval = setInterval(() => {
      setScuttleTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [scuttleActive])

  useEffect(() => {
    // 1. Load the IFrame Player API code asynchronously.
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. Define the callback when ready
    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player('youtube-bg-player', {
        height: '100',
        width: '100',
        videoId: '8ez2L5J08hY',
        playerVars: {
          playsinline: 1,
          loop: 1,
          playlist: '8ez2L5J08hY',
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            if (isMutedRef.current) {
              event.target.mute();
            } else {
              event.target.unMute();
              event.target.setVolume(50);
            }
            if (bgmActiveRef.current) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  useEffect(() => {
    const player = ytPlayerRef.current;
    if (player && typeof player.playVideo === 'function') {
      if (bgmActive) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [bgmActive]);

  useEffect(() => {
    const player = ytPlayerRef.current;
    if (player && typeof player.mute === 'function') {
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(50);
      }
    }
  }, [isMuted]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }

  const playSynthesizer = (type) => {
    if (isMuted) return
    initAudio()
    const ctx = audioCtxRef.current
    const now = ctx.currentTime

    if (type === 'click') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.1)
    } else if (type === 'alarm') {
      const duration = 3.0
      const frequencies = [600, 750]
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        
        osc.frequency.setValueAtTime(freq, now)
        for (let t = 0; t < duration; t += 0.15) {
          osc.frequency.setValueAtTime(freq + (i === 0 ? 150 : -150), now + t)
          osc.frequency.exponentialRampToValueAtTime(freq, now + t + 0.07)
        }

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(2000, now)
        
        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
        
        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        
        osc.start(now)
        osc.stop(now + duration)
      })
    } else if (type === 'scuttle') {
      const duration = 0.8
      const steps = 12
      const stepDuration = duration / steps
      
      for (let i = 0; i < steps; i++) {
        const timeOffset = i * stepDuration
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        
        const startFreq = 400 + Math.random() * 200
        const endFreq = 1600 + Math.random() * 400
        osc.frequency.setValueAtTime(startFreq, now + timeOffset)
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + timeOffset + stepDuration * 0.8)
        
        gain.gain.setValueAtTime(0.05, now + timeOffset)
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + stepDuration)
        
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + timeOffset)
        osc.stop(now + timeOffset + stepDuration)
      }
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.1)
        gain.gain.setValueAtTime(0.06, now + idx * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.1)
        osc.stop(now + idx * 0.1 + 0.3)
      })
    } else if (type === 'speech') {
      const duration = 0.6
      const steps = 7
      const stepDuration = duration / steps
      for (let i = 0; i < steps; i++) {
        const timeOffset = i * stepDuration
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(1800 + Math.random() * 600, now + timeOffset)
        osc.frequency.exponentialRampToValueAtTime(700 + Math.random() * 300, now + timeOffset + stepDuration * 0.9)
        gain.gain.setValueAtTime(0.02, now + timeOffset)
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + stepDuration)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + timeOffset)
        osc.stop(now + timeOffset + stepDuration)
      }
    }
  }

  const speakQuote = () => {
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current)
    }
    
    initAudio()
    playSynthesizer('speech')

    const quotesList = multilingualSpeechQuotes[lang] || multilingualSpeechQuotes.malayalam
    const randomIndex = Math.floor(Math.random() * quotesList.length)
    const quote = quotesList[randomIndex]
    
    setActiveSpeech(quote)
    setIsSpeaking(true)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(quote)
      
      const voices = window.speechSynthesis.getVoices()
      let voiceSelected = null
      
      if (lang === 'malayalam') {
        voiceSelected = voices.find(v => v.lang.toLowerCase().includes('ml') || v.lang.toLowerCase().includes('ml-in'))
      } else if (lang === 'hindi') {
        voiceSelected = voices.find(v => v.lang.toLowerCase().includes('hi') || v.lang.toLowerCase().includes('hi-in'))
      } else {
        voiceSelected = voices.find(v => v.lang.toLowerCase().includes('en'))
      }
      
      if (!voiceSelected && (lang === 'malayalam' || lang === 'hindi')) {
        voiceSelected = voices.find(v => v.lang.toLowerCase().includes('in'))
      }
      
      if (voiceSelected) {
        utterance.voice = voiceSelected
      }
      
      utterance.lang = lang === 'malayalam' ? 'ml-IN' : lang === 'hindi' ? 'hi-IN' : 'en-US'
      utterance.rate = lang === 'english' ? 1.0 : 0.95
      
      utterance.onend = () => {
        setIsSpeaking(false)
        setActiveSpeech(null)
      }
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => {
        setIsSpeaking(false)
        setActiveSpeech(null)
      }, 5500)
    }

    speechTimeoutRef.current = setTimeout(() => {
      setIsSpeaking(false)
      setActiveSpeech(null)
    }, 8500)
  }

  const scheduleStep = (step, time) => {
    if (isMutedRef.current) return
    const ctx = audioCtxRef.current
    if (!ctx) return

    if (step % 4 === 0) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(130, time)
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.14)
      gain.gain.setValueAtTime(0.18, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(time)
      osc.stop(time + 0.14)
    }

    if (step % 4 === 2) {
      const bufferSize = ctx.sampleRate * 0.08
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        const rSeed = Math.sin(step * 45.67 + i)
        data[i] = (rSeed - Math.floor(rSeed)) * 2 - 1
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.setValueAtTime(1400, time)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.035, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      noise.start(time)
      noise.stop(time + 0.09)
    }

    const melody = [
      220, 220, 261.63, 220,
      293.66, 293.66, 329.63, 293.66,
      392, 329.63, 293.66, 261.63,
      220, 261.63, 220, 0
    ]
    
    const freq = melody[step]
    if (freq > 0) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, time)
      
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(750, time)
      filter.frequency.exponentialRampToValueAtTime(250, time + 0.2)
      
      gain.gain.setValueAtTime(0.03, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22)
      
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc.start(time)
      osc.stop(time + 0.23)

      if (step % 2 === 0) {
        const subOsc = ctx.createOscillator()
        const subGain = ctx.createGain()
        subOsc.type = 'sine'
        subOsc.frequency.setValueAtTime(freq / 2, time)
        subGain.gain.setValueAtTime(0.07, time)
        subGain.gain.exponentialRampToValueAtTime(0.001, time + 0.25)
        subOsc.connect(subGain)
        subGain.connect(ctx.destination)
        subOsc.start(time)
        subOsc.stop(time + 0.25)
      }
    }
  }

  const startBgm = () => {
    initAudio()
    setBgmActive(true)
  }

  const stopBgm = () => {
    setBgmActive(false)
  }

  const toggleBgm = () => {
    initAudio()
    if (bgmActive) {
      stopBgm()
    } else {
      setIsMuted(false)
      startBgm()
    }
  }

  const triggerScuttle = () => {
    initAudio()
    setScuttleActive(true)
    setScuttleTimer(4)
    playSynthesizer('alarm')
    playSynthesizer('scuttle')
  }

  const toggleMute = () => {
    const nextMute = !isMuted
    setIsMuted(nextMute)
    if (!nextMute) {
      setTimeout(() => {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        audioCtxRef.current.resume().then(() => {
          const osc = audioCtxRef.current.createOscillator()
          const gain = audioCtxRef.current.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(600, audioCtxRef.current.currentTime)
          gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.15)
          osc.connect(gain)
          gain.connect(audioCtxRef.current.destination)
          osc.start()
          osc.stop(audioCtxRef.current.currentTime + 0.15)
        })
      }, 50)
    }
  }

  const getThreatLabel = () => {
    if (lang === 'malayalam') {
      if (falloutLevel <= 25) return { text: 'മുനിസിപ്പൽ അവശിഷ്ടം', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      if (falloutLevel <= 50) return { text: 'കാബിനറ്റ് സ്പ്രേ', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      if (falloutLevel <= 75) return { text: 'അടുക്കള ലൈറ്റ് ദുരന്തം', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      return { text: 'തെർമോന്യൂക്ലിയർ തിരഞ്ഞെടുപ്പ്', color: 'text-white border-retro-ink bg-retro-saffron animate-pulse' }
    } else if (lang === 'hindi') {
      if (falloutLevel <= 25) return { text: 'नगरपालिका कचरा', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      if (falloutLevel <= 50) return { text: 'कैबिनेट स्प्रे खतरा', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      if (falloutLevel <= 75) return { text: 'रसोई प्रकाश आपदा', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      return { text: 'थर्मोन्यूक्लियर चुनाव', color: 'text-white border-retro-ink bg-retro-saffron animate-pulse' }
    } else {
      if (falloutLevel <= 25) return { text: 'Municipal Debris', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      if (falloutLevel <= 50) return { text: 'Cabinet Spray Threat', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      if (falloutLevel <= 75) return { text: 'Kitchen Light Disaster', color: 'text-retro-ink border-retro-ink bg-retro-paper' }
      return { text: 'Thermonuclear Election', color: 'text-white border-retro-ink bg-retro-saffron animate-pulse' }
    }
  }

  const threat = getThreatLabel()

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-retro-paper doodle-grid text-retro-ink selection:bg-retro-yellow/40 selection:text-retro-ink py-4 px-2 md:px-8 font-sans overflow-x-hidden"
    >
      
      {/* Floating Side Newspaper Index (Table of Contents) - Visible on Desktop only */}
      <div className="fixed left-4 top-1/4 z-30 hidden xl:flex flex-col gap-3 font-typewriter">
        <div className="bg-retro-yellow border-3 border-retro-ink px-4 py-2.5 rounded-xl rotate-[-3deg] text-xs font-black shadow-[3px_3px_0px_#1e1e1e] text-center mb-1 flex items-center justify-center gap-1.5 font-gothic">
          <span>📰</span> Index
        </div>
        {[
          { id: 'page-1', label: 'Page 1: Front Bulletin' },
          { id: 'page-2', label: 'Page 2: Cockroach Janatha Party' },
          { id: 'page-3', label: 'Page 3: Op-Ed & Origin' },
          { id: 'page-4', label: 'Page 4: Situations Vacant' },
          { id: 'page-5', label: 'Page 5: Sports & Leisure' },
          { id: 'page-6', label: 'Page 6: Party Manifesto' }
        ].map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth' })
              playSynthesizer('click')
            }}
            className="bg-retro-card hover:bg-retro-yellow border-2 border-retro-ink px-3 py-2 rounded-lg text-[10px] font-black text-left shadow-[2px_2px_0px_#1e1e1e] transition-all hover:translate-x-1 cursor-pointer w-44 flex items-center justify-between font-gothic"
          >
            <span>{p.label}</span>
            <ChevronRight className="w-3 h-3 text-retro-ink/50" />
          </button>
        ))}
      </div>

      {/* Sticky Quick-Access Header Bar */}
      <div className="sticky top-0 z-40 w-full max-w-6xl mx-auto mb-6 bg-retro-card/90 backdrop-blur border-3 border-retro-ink p-3 shadow-[4px_4px_0px_#1e1e1e] flex flex-wrap items-center justify-between gap-3 rounded-2xl pointer-events-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); playSynthesizer('click'); }}>
          <CJPLogo className="w-8 h-8" />
          <span className="font-gothic text-xl font-bold tracking-wide text-retro-ink">Cockroach Janatha Party</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-retro-paper border-2 border-retro-ink rounded-lg p-0.5">
            <button 
              onClick={() => { setLang('malayalam'); playSynthesizer('click'); }}
              className={`px-2.5 py-1 text-[9px] font-bold rounded transition-all cursor-pointer ${lang === 'malayalam' ? 'bg-retro-yellow text-retro-ink font-black border border-retro-ink' : 'text-retro-ink/60 hover:text-retro-ink'}`}
            >
              ML
            </button>
            <button 
              onClick={() => { setLang('hindi'); playSynthesizer('click'); }}
              className={`px-2.5 py-1 text-[9px] font-bold rounded transition-all cursor-pointer ${lang === 'hindi' ? 'bg-retro-yellow text-retro-ink font-black border border-retro-ink' : 'text-retro-ink/60 hover:text-retro-ink'}`}
            >
              HI
            </button>
            <button 
              onClick={() => { setLang('english'); playSynthesizer('click'); }}
              className={`px-2.5 py-1 text-[9px] font-bold rounded transition-all cursor-pointer ${lang === 'english' ? 'bg-retro-yellow text-retro-ink font-black border border-retro-ink' : 'text-retro-ink/60 hover:text-retro-ink'}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={toggleBgm}
            className={`px-3 py-1.5 font-typewriter text-[10px] font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer doodle-btn ${
              bgmActive
                ? 'bg-retro-yellow/20 border-retro-ink text-retro-ink'
                : 'bg-retro-card text-retro-ink/65'
            }`}
          >
            <span>🎵 BGM</span>
            {bgmActive ? (
              <div className="flex items-end gap-[2px] h-2.5 w-3 overflow-hidden mb-[1px]">
                <div className="w-[2px] bg-retro-ink eq-bar-1" />
                <div className="w-[2px] bg-retro-ink eq-bar-2" />
                <div className="w-[2px] bg-retro-ink eq-bar-3" />
              </div>
            ) : null}
          </button>

          <button 
            onClick={toggleMute} 
            className={`p-1.5 rounded-lg border-2 border-retro-ink transition-all flex items-center justify-center cursor-pointer ${
              isMuted 
                ? 'text-retro-ink/40 bg-retro-card/50' 
                : 'text-retro-ink bg-retro-yellow/25 shadow-[1px_1px_0px_#1e1e1e]'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* CONTINUOUS PRINT SHEET WRAPPER (ELIMINATES BLANK BACKGROUND SPACES BETWEEN SHEETS) */}
      <div className="w-full max-w-6xl mx-auto bg-retro-card newspaper-container p-4 md:p-8 relative">
        
        {/* ============================================================== */}
        {/* PAGE 1: THE FRONT-PAGE LEAD BULLETIN                          */}
        {/* ============================================================== */}
        <div id="page-1" className="w-full pb-8 border-b-6 border-retro-ink">
          <header className="w-full flex flex-col items-center mb-6">
            <div className="w-full flex justify-between text-[9px] font-typewriter text-retro-ink/75 uppercase font-black px-1 pb-1">
              <span>VOL. CCCL - NO. 1</span>
              <span>NEW DELHI, THURSDAY, MAY 21, 2026</span>
              <span>PRICE: ONE CRUMB</span>
            </div>
            
            <div className="w-full newspaper-header-line" />
            
            <div className="w-full text-center py-4 flex flex-col md:flex-row items-center justify-between border-b border-retro-ink/20 pb-4">
              <div className="flex items-center gap-3 text-left">
                <CJPLogo className="w-14 h-14" />
                <div>
                  <h1 className="font-gothic text-4xl md:text-6xl text-retro-ink leading-none">
                    {lang === 'malayalam' ? 'കോക്രോച്ച് ജനതാ പാർട്ടി' : lang === 'hindi' ? 'कॉकरोच जनता पार्टी' : 'Cockroach Janatha Party'}
                  </h1>
                  <p className="font-typewriter text-[10px] text-retro-green font-black uppercase tracking-wider mt-1">
                    {lang === 'malayalam' ? 'ദേശീയ അധിനിവേശ ലീഗ്' : lang === 'hindi' ? 'राष्ट्रीय आक्रमण लीग' : 'National Infestation League'}
                  </p>
                </div>
              </div>
              <div className="text-right font-typewriter text-[9px] text-retro-ink/70">
                <p>ESTD. 350,000,000 B.C.</p>
                <p>PAGE 1 OF 6</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-4">
            <div className="md:col-span-4 flex flex-col gap-3">
              <div className="w-full border-3 border-retro-ink p-2 bg-retro-card shadow-[4px_4px_0px_#1e1e1e] relative">
                <div className="overflow-hidden relative">
                  <motion.div
                    style={{
                      x: bgImageX,
                      y: bgImageY,
                      rotateX: bgImageRotateX,
                      rotateY: bgImageRotateY,
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{ scale: bgRoachScale }}
                    className="w-full h-48 md:h-56 flex items-center justify-center bg-retro-paper border border-retro-ink"
                  >
                    <img 
                      src="/cjp_leader_press.png" 
                      alt="CJP Background Cockroach" 
                      className="w-full h-full object-contain filter sepia-[15%]"
                    />
                  </motion.div>
                </div>
                <div className="mt-2 flex items-center justify-between font-typewriter text-[9px] text-retro-ink/70 border-t border-retro-ink/20 pt-2 italic font-bold">
                  <span>Fig 1. Party Leader scuttling out of archives.</span>
                  <button 
                    onClick={() => { speakQuote(); if (!isMuted) initAudio(); }}
                    className="not-italic bg-retro-paper hover:bg-retro-yellow border border-retro-ink px-1.5 py-0.5 rounded text-[8px] font-black cursor-pointer transition-all flex items-center gap-0.5"
                  >
                    🔊 LISTEN
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-4 md:border-r-2 md:border-retro-ink md:pr-6">
              <div className="border-b border-retro-ink/20 pb-3">
                <span className="inline-block px-2 py-0.5 border border-retro-ink bg-retro-yellow/30 text-retro-ink text-[9px] font-typewriter font-black mb-2">
                  🚨 {lang === 'malayalam' ? 'പ്രധാന വാർത്ത' : lang === 'hindi' ? 'मुख्य समाचार' : 'LEAD STORY'}
                </span>
                <h2 className="text-3xl md:text-4xl font-doodle font-black text-retro-ink leading-none tracking-tight">
                  {translations[lang].hero_h1_part1} {translations[lang].hero_h1_part2} <span className="marker-saffron text-white">{translations[lang].hero_h1_part3}</span>
                </h2>
              </div>
              <p className="text-retro-ink/90 font-sans text-xs md:text-sm leading-relaxed text-justify newspaper-lead-cap">
                {translations[lang].hero_description}
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              <div className="w-full text-center py-0.5 border-y border-retro-ink/30 font-typewriter text-[9px] font-black uppercase tracking-widest bg-retro-paper">
                [ SWARM BULLETINS ]
              </div>
              <div className="space-y-3 font-sans text-[11px] text-retro-ink/85">
                <div className="border-b border-retro-ink/10 pb-2">
                  <span className="font-bold text-retro-saffron uppercase block">100k Rads Resilience</span>
                  <span>Guarantees CJP administration survives all nuclear fallout scenarios.</span>
                </div>
                <div>
                  <span className="font-bold text-retro-green uppercase block">{swarmCount.toLocaleString()} Members</span>
                  <span>Growing exponentially inside capital wardrobes.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 2: NATIONAL GAZETTE                                      */}
        {/* ============================================================== */}
        <div id="page-2" className="w-full py-8 border-b-6 border-retro-ink">
          <header className="w-full flex flex-col items-center mb-6">
            <div className="w-full flex justify-between text-[9px] font-typewriter text-retro-ink/75 uppercase font-black px-1 pb-1 font-gothic">
              <span>The CJP National Gazette</span>
              <span>Thursday, May 21, 2026</span>
              <span>Page 2 of 6</span>
            </div>
            <div className="w-full newspaper-header-line" />
          </header>

          <h3 className="font-gothic text-2xl md:text-3xl text-center font-bold text-retro-ink tracking-wide py-2 border-b border-retro-ink/20 mb-6">
            {translations[lang].national_news_title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="border-r-0 md:border-r-2 md:border-retro-ink/15 pr-0 md:pr-6 flex flex-col">
              <div className="w-full text-center py-0.5 border-y border-retro-ink/20 mb-3 font-typewriter text-[9px] font-black uppercase bg-retro-paper">
                [ BULLETINS 1 ]
              </div>
              <h4 className="font-doodle text-xl font-black text-retro-saffron mb-2 uppercase">
                {translations[lang].national_news_col1_title}
              </h4>
              <p className="text-retro-ink/90 font-sans text-xs leading-relaxed text-justify mb-4">
                {translations[lang].national_news_col1_desc}
              </p>
              <span className="font-typewriter text-[8px] text-retro-ink/65 italic font-bold">
                {translations[lang].column_byline}
              </span>
            </div>

            <div className="border-r-0 md:border-r-2 md:border-retro-ink/15 pr-0 md:pr-6 flex flex-col">
              <div className="w-full text-center py-0.5 border-y border-retro-ink/20 mb-3 font-typewriter text-[9px] font-black uppercase bg-retro-paper">
                [ BULLETINS 2 ]
              </div>
              <h4 className="font-doodle text-xl font-black text-retro-green mb-2 uppercase">
                {translations[lang].national_news_col2_title}
              </h4>
              <p className="text-retro-ink/90 font-sans text-xs leading-relaxed text-justify mb-4">
                {translations[lang].national_news_col2_desc}
              </p>
              <span className="font-typewriter text-[8px] text-retro-ink/65 italic font-bold">
                {translations[lang].column_byline}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full text-center py-0.5 border-y border-retro-ink/20 mb-3 font-typewriter text-[9px] font-black uppercase bg-retro-paper">
                [ REVENUE MATRIX ]
              </div>
              <h4 className="font-doodle text-xl font-black text-retro-ink mb-2 uppercase">
                {translations[lang].national_news_col3_title}
              </h4>
              <p className="text-retro-ink/90 font-sans text-xs leading-relaxed text-justify mb-4">
                {translations[lang].national_news_col3_desc}
              </p>

              <div className="border border-retro-ink p-3 bg-retro-paper rounded-lg text-center">
                <span className="font-typewriter text-[8px] font-black uppercase text-retro-ink/70 block mb-2">
                  OFFICE ARCHIVE CONSUMPTION MATRIX
                </span>
                <div className="flex items-end justify-center gap-2 h-14 pt-1">
                  <div className="w-4 bg-retro-ink/30 h-4 rounded-t" />
                  <div className="w-4 bg-retro-ink/50 h-8 rounded-t" />
                  <div className="w-4 bg-retro-ink/75 h-10 rounded-t" />
                  <div className="w-4 bg-retro-saffron h-14 rounded-t animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 3: OPINION & EDITORIAL                                   */}
        {/* ============================================================== */}
        <div id="page-3" className="w-full py-8 border-b-6 border-retro-ink">
          <header className="w-full flex flex-col items-center mb-6">
            <div className="w-full flex justify-between text-[9px] font-typewriter text-retro-ink/75 uppercase font-black px-1 pb-1 font-gothic">
              <span>The CJP Opinion & Editorial</span>
              <span>Thursday, May 21, 2026</span>
              <span>Page 3 of 6</span>
            </div>
            <div className="w-full newspaper-header-line" />
          </header>

          <h3 className="font-gothic text-2xl md:text-3xl text-center font-bold text-retro-ink tracking-wide py-2 border-b border-retro-ink/20 mb-6">
            {translations[lang].history_title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 flex flex-col gap-4 md:border-r-2 md:border-retro-ink/15 md:pr-8">
              <p className="text-retro-ink/90 font-sans text-xs md:text-sm leading-relaxed text-justify">
                {translations[lang].history_p1}
              </p>
              <p className="text-retro-ink/90 font-sans text-xs md:text-sm leading-relaxed text-justify">
                {translations[lang].history_p2}
              </p>
              <div className="p-3 bg-retro-yellow/15 border-2 border-retro-ink rounded-xl text-center text-xs font-typewriter text-retro-ink font-black mt-2 rotate-[-1deg]">
                {translations[lang].history_quote}
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="p-4 bg-retro-paper border border-retro-ink rounded-xl">
                <span className="font-doodle text-base font-black text-retro-ink block mb-2 uppercase">
                  GUEST ESSAY: LAZINESS AS ZEN
                </span>
                <p className="font-sans text-xs text-retro-ink/80 leading-relaxed text-justify mb-2">
                  "For centuries, humans have pushed a toxic hustle culture. CJP offers an alternative: conserve energy, rest in corners, and stare at phone screens. Doing nothing is the ultimate evolutionary protest against structural flaws."
                </p>
                <span className="font-typewriter text-[9px] text-retro-ink/60 font-bold block">
                  — strategic Lead strategist
                </span>
              </div>

              <div className="border border-retro-ink/30 p-3 rounded-lg text-center bg-retro-paper mt-2">
                <span className="font-typewriter text-[8px] text-retro-ink/50 uppercase block mb-1">
                  OFFICIAL MEDITATION SCHEMATIC
                </span>
                <div className="text-2xl animate-bounce my-1">💤🪳</div>
                <p className="font-sans text-[9px] text-retro-ink/75">
                  11 Hours Screen Time + Dark Cabinets = Perfect Immunity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 4: CLASSIFIEDS & VACANCIES                               */}
        {/* ============================================================== */}
        <div id="page-4" className="w-full py-8 border-b-6 border-retro-ink">
          <header className="w-full flex flex-col items-center mb-6">
            <div className="w-full flex justify-between text-[9px] font-typewriter text-retro-ink/75 uppercase font-black px-1 pb-1 font-gothic">
              <span>The CJP Classifieds</span>
              <span>Thursday, May 21, 2026</span>
              <span>Page 4 of 6</span>
            </div>
            <div className="w-full newspaper-header-line" />
          </header>

          <h3 className="font-gothic text-2xl md:text-3xl text-center font-bold text-retro-ink tracking-wide py-2 border-b border-retro-ink/20 mb-8">
            🚨 {translations[lang].criteria_tab} & SITUATIONS VACANT
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border border-retro-ink rounded-lg bg-retro-paper flex flex-col justify-between">
              <div>
                <div className="p-2 bg-retro-saffron/20 border border-retro-ink rounded-lg w-fit text-retro-saffron mb-3">
                  <Skull className="w-4 h-4" />
                </div>
                <h4 className="font-doodle font-black text-lg text-retro-ink mb-1.5 uppercase leading-none">
                  {translations[lang].criteria_c1_title}
                </h4>
                <p className="text-retro-ink/80 font-sans text-xs leading-relaxed">
                  {translations[lang].criteria_c1_desc}
                </p>
              </div>
              <span className="font-typewriter text-[8px] text-retro-ink/40 uppercase block mt-4 border-t border-retro-ink/10 pt-2">
                Code: UNEMP-01
              </span>
            </div>

            <div className="p-4 border border-retro-ink rounded-lg bg-retro-paper flex flex-col justify-between">
              <div>
                <div className="p-2 bg-retro-yellow/30 border border-retro-ink rounded-lg w-fit text-retro-ink mb-3">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-doodle font-black text-lg text-retro-ink mb-1.5 uppercase leading-none">
                  {translations[lang].criteria_c2_title}
                </h4>
                <p className="text-retro-ink/80 font-sans text-xs leading-relaxed">
                  {translations[lang].criteria_c2_desc}
                </p>
              </div>
              <span className="font-typewriter text-[8px] text-retro-ink/40 uppercase block mt-4 border-t border-retro-ink/10 pt-2">
                Code: LAZY-02
              </span>
            </div>

            <div className="p-4 border border-retro-ink rounded-lg bg-retro-paper flex flex-col justify-between">
              <div>
                <div className="p-2 bg-retro-green/20 border border-retro-ink rounded-lg w-fit text-retro-green mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-doodle font-black text-lg text-retro-ink mb-1.5 uppercase leading-none">
                  {translations[lang].criteria_c3_title}
                </h4>
                <p className="text-retro-ink/80 font-sans text-xs leading-relaxed">
                  {translations[lang].criteria_c3_desc}
                </p>
              </div>
              <span className="font-typewriter text-[8px] text-retro-ink/40 uppercase block mt-4 border-t border-retro-ink/10 pt-2">
                Code: ONL-03
              </span>
            </div>

            <div className="p-4 border border-retro-ink rounded-lg bg-retro-paper flex flex-col justify-between">
              <div>
                <div className="p-2 bg-retro-yellow/50 border border-retro-ink rounded-lg w-fit text-retro-ink mb-3">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-doodle font-black text-lg text-retro-ink mb-1.5 uppercase leading-none">
                  {translations[lang].criteria_c4_title}
                </h4>
                <p className="text-retro-ink/80 font-sans text-xs leading-relaxed">
                  {translations[lang].criteria_c4_desc}
                </p>
              </div>
              <span className="font-typewriter text-[8px] text-retro-ink/40 uppercase block mt-4 border-t border-retro-ink/10 pt-2">
                Code: RANT-04
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 5: SPORTS & LEISURE                                      */}
        {/* ============================================================== */}
        <div id="page-5" className="w-full py-8 border-b-6 border-retro-ink">
          <header className="w-full flex flex-col items-center mb-6">
            <div className="w-full flex justify-between text-[9px] font-typewriter text-retro-ink/75 uppercase font-black px-1 pb-1 font-gothic">
              <span>The CJP Sports & Leisure</span>
              <span>Thursday, May 21, 2026</span>
              <span>Page 5 of 6</span>
            </div>
            <div className="w-full newspaper-header-line" />
          </header>

          <h3 className="font-gothic text-2xl md:text-3xl text-center font-bold text-retro-ink tracking-wide py-2 border-b border-retro-ink/20 mb-8">
            🎯 {translations[lang].interactive_training} & LEISURE
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="border border-retro-ink p-4 bg-retro-paper rounded-lg">
                <h4 className="font-doodle font-black text-xl text-retro-ink mb-1 uppercase">
                  🚨 {translations[lang].scuttle_simulator}
                </h4>
                <p className="text-[10px] font-typewriter text-retro-ink/65 mb-4 uppercase">
                  Flicker the kitchen light switch to scatter the CJP members!
                </p>

                <button
                  onClick={triggerScuttle}
                  disabled={scuttleActive}
                  className={`w-full py-3.5 font-typewriter text-xs font-black tracking-wider transition-all pointer-events-auto flex items-center justify-center gap-2 cursor-pointer doodle-btn ${
                    scuttleActive 
                      ? 'bg-retro-saffron/20 text-retro-saffron border-red-500/50 cursor-not-allowed animate-pulse'
                      : 'bg-retro-yellow text-retro-ink'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${scuttleActive ? 'animate-spin' : ''}`} />
                  <span>{lang === 'malayalam' ? 'ലൈറ്റ് ഓൺ!' : lang === 'hindi' ? 'लाइट चालू!' : 'Light ON!'}</span>
                </button>
              </div>

              <div className="border border-retro-ink p-4 bg-retro-paper rounded-lg">
                <div className="flex justify-between items-center mb-3 font-typewriter text-xs text-retro-ink font-black">
                  <span>☢️ {translations[lang].threat_level}</span>
                  <span className="px-2 py-0.5 bg-retro-saffron text-white rounded text-[9px] uppercase tracking-wider animate-pulse">
                    {threat.text}
                  </span>
                </div>

                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={falloutLevel} 
                  onChange={(e) => {
                    setFalloutLevel(parseInt(e.target.value))
                    if (!isMuted) initAudio()
                  }}
                  className="w-full cursor-pointer"
                />
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="border border-retro-ink p-4 bg-retro-paper rounded-lg">
                <h4 className="font-doodle text-lg text-retro-ink mb-1 uppercase">
                  🧩 {translations[lang].crossword_title}
                </h4>
                <p className="text-[9px] font-typewriter text-retro-ink/65 mb-4 leading-normal uppercase">
                  {translations[lang].crossword_desc}
                </p>

                <div className="grid grid-cols-5 gap-1.5 w-full max-w-[160px] mx-auto mb-4 bg-retro-ink p-1.5 rounded-lg">
                  {Array.from({ length: 5 }).map((_, r) => (
                    Array.from({ length: 5 }).map((_, c) => {
                      const coord = `${r},${c}`
                      const isActive = coord in crossword
                      let clueNum = null
                      if (r === 0 && c === 0) clueNum = 1
                      if (r === 2 && c === 1) clueNum = 2
                      if (r === 4 && c === 2) clueNum = 3

                      return (
                        <div 
                          key={coord} 
                          className={`aspect-square relative flex items-center justify-center rounded-sm ${
                            isActive ? 'bg-retro-card' : 'bg-retro-ink'
                          }`}
                        >
                          {clueNum && (
                            <span className="absolute top-[1px] left-[2px] text-[6px] font-typewriter font-black text-retro-ink/60 leading-none">
                              {clueNum}
                            </span>
                          )}
                          {isActive ? (
                            <input
                              type="text"
                              maxLength={1}
                              value={crossword[coord]}
                              onChange={(e) => handleCrosswordChange(coord, e.target.value)}
                              className="w-full h-full text-center text-sm font-typewriter font-black text-retro-ink uppercase bg-transparent outline-none focus:bg-retro-yellow/20"
                            />
                          ) : null}
                        </div>
                      )
                    })
                  ))}
                </div>

                {crosswordSuccess ? (
                  <div className="text-center text-retro-green font-typewriter text-[10px] font-bold leading-none animate-pulse">
                    🏆 CORRECT! SOLUTION FOUND!
                  </div>
                ) : (
                  <div className="flex gap-2 text-[8px] font-typewriter text-retro-ink/50 justify-between uppercase">
                    <span>1. roach (5)</span>
                    <span>2. lazy (4)</span>
                    <span>3. cjp (3)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 6: OFFICIAL PARTY MANIFESTO & COUPON                     */}
        {/* ============================================================== */}
        <div id="page-6" className="w-full pt-8">
          <header className="w-full flex flex-col items-center mb-6">
            <div className="w-full flex justify-between text-[9px] font-typewriter text-retro-ink/75 uppercase font-black px-1 pb-1 font-gothic">
              <span>Cockroach Janatha Party</span>
              <span>Thursday, May 21, 2026</span>
              <span>Page 6 of 6</span>
            </div>
            <div className="w-full newspaper-header-line" />
          </header>

          <h3 className="font-gothic text-2xl md:text-3xl text-center font-bold text-retro-ink tracking-wide py-2 border-b border-retro-ink/20 mb-8">
            📜 {translations[lang].manifesto_title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 flex flex-col gap-4 md:border-r-2 md:border-retro-ink/15 md:pr-8">
              <p className="text-retro-ink/90 font-sans text-xs md:text-sm leading-relaxed text-justify mb-2">
                {translations[lang].manifesto_desc}
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-retro-saffron border border-retro-ink mt-1.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-retro-ink/90 leading-relaxed"><span className="text-retro-green font-black">{translations[lang].manifesto_p1_title}</span> {translations[lang].manifesto_p1_desc}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-retro-saffron border border-retro-ink mt-1.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-retro-ink/90 leading-relaxed"><span className="text-retro-green font-black">{translations[lang].manifesto_p2_title}</span> {translations[lang].manifesto_p2_desc}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-retro-saffron border border-retro-ink mt-1.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-retro-ink/90 leading-relaxed"><span className="text-retro-green font-black">{translations[lang].manifesto_p3_title}</span> {translations[lang].manifesto_p3_desc}</p>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-retro-saffron border border-retro-ink mt-1.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-retro-ink/90 leading-relaxed"><span className="text-retro-green font-black">{translations[lang].manifesto_p4_title}</span> {translations[lang].manifesto_p4_desc}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="p-4 border border-retro-ink bg-retro-paper rounded-xl">
                <h4 className="font-doodle text-base font-black text-retro-ink mb-2 uppercase">
                  📱 DIGITAL STATISTICS
                </h4>
                <div className="space-y-2 font-sans text-xs text-retro-ink/95 leading-normal">
                  <div>
                    <span className="font-bold text-retro-saffron uppercase block">{translations[lang].digital_d1_title}</span>
                    <span>{translations[lang].digital_d1_desc}</span>
                  </div>
                  <div>
                    <span className="font-bold text-retro-green uppercase block">{translations[lang].digital_d2_title}</span>
                    <span>{translations[lang].digital_d2_desc}</span>
                  </div>
                </div>
              </div>

              <div className="border border-dashed border-retro-ink p-3 bg-retro-paper rounded-lg relative text-center">
                <div className="absolute -top-2 left-6 bg-retro-paper px-1.5 text-[8px] font-typewriter font-black">
                  ✂️ APOCALYPTIC CUTOUT
                </div>
                
                <p className="font-sans text-[10px] text-retro-ink/80 mb-3 leading-relaxed text-justify">
                  Check this box at your nearest kitchen drawer, and get 1 Free Sugar Crumb as a welcome packet.
                </p>

                <button
                  onClick={handleJoinSwarm}
                  className="w-full py-3 text-white bg-retro-saffron font-typewriter text-xs font-black tracking-wider doodle-btn flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-white" />
                  {translations[lang].join_swarm_button}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER GENERAL */}
      <footer className="w-full max-w-6xl mx-auto border-t-2 border-retro-ink pt-6 pb-12 pointer-events-auto mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-typewriter text-[10px] text-retro-ink/65 uppercase font-bold">
          <div className="flex items-center gap-1.5 font-typewriter">
            <CJPLogo className="w-5 h-5 animate-pulse" />
            <span>© 2026 {translations[lang].title}. {translations[lang].rights_reserved}</span>
          </div>
          <div className="flex gap-3">
            <a href="#" className="hover:text-retro-saffron hover:underline transition-all">{translations[lang].drainage_rules}</a>
            <span>•</span>
            <a href="#" className="hover:text-retro-saffron hover:underline transition-all">{translations[lang].light_resistance}</a>
            <span>•</span>
            <a href="#" className="hover:text-retro-saffron hover:underline transition-all">{translations[lang].pest_control_plan}</a>
          </div>
        </div>
      </footer>

      {/* Multilingual Speech Callout Floating Bubble */}
      <AnimatePresence>
        {activeSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="fixed bottom-6 right-6 md:right-12 z-40 max-w-xs p-4 bg-retro-yellow border-3 border-retro-ink rounded-xl shadow-[4px_4px_0px_#1e1e1e] cursor-pointer animate-bounce"
            onClick={speakQuote}
          >
            <div className="absolute -bottom-[8px] right-8 w-3 h-3 bg-retro-yellow border-r-3 border-b-3 border-retro-ink transform rotate-45" />
            <div className="flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-retro-ink flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[9px] font-typewriter text-retro-ink/70 uppercase font-black tracking-wider mb-0.5">{translations[lang].leader_speaking}</div>
                <p className="leading-relaxed font-sans text-xs text-retro-ink font-bold">{activeSpeech}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="youtube-bg-player" style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}></div>
      <ConfettiOverlay trigger={confettiTrigger} />
      <CursorTrail />
    </div>
  )
}

function CursorTrail() {
  const [trail, setTrail] = useState([])

  useEffect(() => {
    const handleMove = (e) => {
      setTrail((prev) => [
        ...prev.slice(-10),
        { x: e.clientX, y: e.clientY, id: Math.random() }
      ])
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-sans">
      {trail.map((p, idx) => {
        const opacity = idx / trail.length
        const scale = 0.25 + (idx / trail.length) * 0.75
        return (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-retro-saffron/60 rounded-full filter blur-[0.5px]"
            style={{
              left: p.x - 4,
              top: p.y - 4,
              opacity: opacity * 0.35,
              transform: `scale(${scale})`,
              transition: 'opacity 0.15s, transform 0.15s'
            }}
          />
        )
      })}
    </div>
  )
}

function ConfettiOverlay({ trigger }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return
    const newParticles = Array.from({ length: 28 }).map(() => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      size: 18 + Math.random() * 24,
      angle: -60 - Math.random() * 60,
      speed: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      rotSpeed: -8 + Math.random() * 16
    }))
    setParticles((prev) => [...prev, ...newParticles])
  }, [trigger])

  useEffect(() => {
    if (particles.length === 0) return
    let animFrame
    const update = () => {
      setParticles((prev) => {
        const next = prev
          .map((c) => {
            const rad = (c.angle * Math.PI) / 180
            return {
              ...c,
              x: c.x + Math.cos(rad) * c.speed,
              y: c.y + Math.sin(rad) * c.speed,
              rotation: c.rotation + c.rotSpeed,
            }
          })
          .filter((c) => c.y > -80 && c.x > -80 && c.x < window.innerWidth + 80)
        
        if (next.length > 0) {
          animFrame = requestAnimationFrame(update)
        }
        return next
      })
    }
    animFrame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animFrame)
  }, [particles.length > 0])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((c) => (
        <img
          key={c.id}
          src="/cockroach-cursor.svg"
          alt="scuttling cockroach particle"
          className="absolute opacity-80"
          style={{
            left: c.x,
            top: c.y,
            width: c.size,
            height: c.size,
            transform: `rotate(${c.rotation}deg)`,
            filter: 'drop-shadow(2px 2px 0px rgba(30, 30, 30, 0.4))',
          }}
        />
      ))}
    </div>
  )
}

export default App
