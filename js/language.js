/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | SIH26032 | Code Cultivators
 *
 * File: js/language.js
 * Multilingual UI Support
 */

(function () {
    "use strict";

    const LANGUAGE_KEY = "SIH26032_SELECTED_LANGUAGE";

    const languages = {
        en: "English",
        hi: "हिन्दी",
        pa: "ਪੰਜਾਬੀ",
        hr: "हरियाणवी",
        bn: "বাংলা",
        mr: "मराठी",
        gu: "ગુજરાતી",
        ta: "தமிழ்",
        te: "తెలుగు",
        kn: "ಕನ್ನಡ",
        ml: "മലയാളം",
        or: "ଓଡ଼ିଆ",
        as: "অসমীয়া",
        ur: "اردو"
    };

    /*
     * Translation dictionary
     * English text -> translated text
     */

    const translations = {

        // =========================
        // COMMON
        // =========================

        "Home": {
            hi: "होम",
            pa: "ਮੁੱਖ ਪੰਨਾ",
            hr: "होम",
            bn: "হোম",
            mr: "मुख्यपृष्ठ",
            gu: "હોમ",
            ta: "முகப்பு",
            te: "హోమ్",
            kn: "ಮುಖಪುಟ",
            ml: "ഹോം",
            or: "ହୋମ୍",
            as: "হোম",
            ur: "ہوم"
        },

        "Farmer Registration": {
            hi: "किसान पंजीकरण",
            pa: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
            hr: "किसान पंजीकरण",
            bn: "কৃষক নিবন্ধন",
            mr: "शेतकरी नोंदणी",
            gu: "ખેડૂત નોંધણી",
            ta: "விவசாயி பதிவு",
            te: "రైతు నమోదు",
            kn: "ರೈತ ನೋಂದಣಿ",
            ml: "കർഷക രജിസ്ട്രേഷൻ",
            or: "କୃଷକ ପଞ୍ଜୀକରଣ",
            as: "কৃষক পঞ্জীয়ন",
            ur: "کسان رجسٹریشن"
        },

        "Centres": {
            hi: "केंद्र",
            pa: "ਕੇਂਦਰ",
            hr: "केंद्र",
            bn: "কেন্দ্র",
            mr: "केंद्रे",
            gu: "કેન્દ્રો",
            ta: "மையங்கள்",
            te: "కేంద్రాలు",
            kn: "ಕೇಂದ್ರಗಳು",
            ml: "കേന്ദ്രങ്ങൾ",
            or: "କେନ୍ଦ୍ରଗୁଡ଼ିକ",
            as: "কেন্দ্ৰসমূহ",
            ur: "مراکز"
        },

        "Token & Slot": {
            hi: "टोकन और स्लॉट",
            pa: "ਟੋਕਨ ਅਤੇ ਸਲਾਟ",
            hr: "टोकन और स्लॉट",
            bn: "টোকেন ও স্লট",
            mr: "टोकन आणि स्लॉट",
            gu: "ટોકન અને સ્લોટ",
            ta: "டோக்கன் மற்றும் ஸ்லாட்",
            te: "టోకెన్ & స్లాట్",
            kn: "ಟೋಕನ್ ಮತ್ತು ಸ್ಲಾಟ್",
            ml: "ടോക്കൺ & സ്ലോട്ട്",
            or: "ଟୋକେନ୍ ଏବଂ ସ୍ଲଟ୍",
            as: "টোকেন আৰু স্লট",
            ur: "ٹوکن اور سلاٹ"
        },

        "Live Queue": {
            hi: "लाइव कतार",
            pa: "ਲਾਈਵ ਕਤਾਰ",
            hr: "लाइव कतार",
            bn: "লাইভ সারি",
            mr: "लाइव्ह रांग",
            gu: "લાઇવ કતાર",
            ta: "நேரடி வரிசை",
            te: "లైవ్ క్యూ",
            kn: "ಲೈವ್ ಸರತಿ",
            ml: "ലൈവ് ക്യൂ",
            or: "ଲାଇଭ୍ କ୍ୟୁ",
            as: "লাইভ শাৰী",
            ur: "لائیو قطار"
        },

        "Tracking": {
            hi: "ट्रैकिंग",
            pa: "ਟ੍ਰੈਕਿੰਗ",
            hr: "ट्रैकिंग",
            bn: "ট্র্যাকিং",
            mr: "ट्रॅकिंग",
            gu: "ટ્રેકિંગ",
            ta: "கண்காணிப்பு",
            te: "ట్రాకింగ్",
            kn: "ಟ್ರ್ಯಾಕಿಂಗ್",
            ml: "ട്രാക്കിംഗ്",
            or: "ଟ୍ରାକିଂ",
            as: "ট্ৰেকিং",
            ur: "ٹریکنگ"
        },

        "Rescheduling": {
            hi: "पुनर्निर्धारण",
            pa: "ਮੁੜ-ਤਹਿ",
            hr: "दोबारा समय निर्धारण",
            bn: "পুনঃনির্ধারণ",
            mr: "पुनर्नियोजन",
            gu: "ફરીથી સમય નક્કી કરવું",
            ta: "மறு அட்டவணை",
            te: "రీషెడ్యూలింగ్",
            kn: "ಮರು ನಿಗದಿಪಡಿಸುವಿಕೆ",
            ml: "വീണ്ടും ഷെഡ്യൂൾ ചെയ്യൽ",
            or: "ପୁନଃନିର୍ଦ୍ଧାରଣ",
            as: "পুনৰ সময় নিৰ্ধাৰণ",
            ur: "دوبارہ شیڈولنگ"
        },

        "Procurement Status": {
            hi: "खरीद स्थिति",
            pa: "ਖਰੀਦ ਸਥਿਤੀ",
            hr: "खरीद स्थिति",
            bn: "ক্রয় অবস্থা",
            mr: "खरेदी स्थिती",
            gu: "ખરીદી સ્થિતિ",
            ta: "கொள்முதல் நிலை",
            te: "కొనుగోలు స్థితి",
            kn: "ಖರೀದಿ ಸ್ಥಿತಿ",
            ml: "സംഭരണ നില",
            or: "କ୍ରୟ ସ୍ଥିତି",
            as: "ক্ৰয় স্থিতি",
            ur: "خریداری کی صورتحال"
        },

        "Alerts": {
            hi: "सूचनाएँ",
            pa: "ਚੇਤਾਵਨੀਆਂ",
            hr: "सूचनाएँ",
            bn: "সতর্কতা",
            mr: "सूचना",
            gu: "ચેતવણીઓ",
            ta: "எச்சரிக்கைகள்",
            te: "అలర్ట్‌లు",
            kn: "ಎಚ್ಚರಿಕೆಗಳು",
            ml: "അറിയിപ്പുകൾ",
            or: "ସତର୍କତା",
            as: "সতৰ্কবাণী",
            ur: "الرٹس"
        },

        "Judge Demo (16 Steps)": {
            hi: "जज डेमो (16 चरण)",
            pa: "ਜੱਜ ਡੈਮੋ (16 ਕਦਮ)",
            hr: "जज डेमो (16 चरण)",
            bn: "জাজ ডেমো (১৬ ধাপ)",
            mr: "जज डेमो (16 टप्पे)",
            gu: "જજ ડેમો (16 પગલાં)",
            ta: "ஜட்ஜ் டெமோ (16 படிகள்)",
            te: "జడ్జ్ డెమో (16 దశలు)",
            kn: "ಜಡ್ಜ್ ಡೆಮೊ (16 ಹಂತಗಳು)",
            ml: "ജഡ്ജ് ഡെമോ (16 ഘട്ടങ്ങൾ)",
            or: "ଜଜ୍ ଡେମୋ (16 ପଦକ୍ଷେପ)",
            as: "জাজ ডেমো (১৬টা ধাপ)",
            ur: "جج ڈیمو (16 مراحل)"
        },

        // =========================
        // HEADER
        // =========================

        "Smart Procurement Scheduling": {
            hi: "स्मार्ट खरीद शेड्यूलिंग",
            pa: "ਸਮਾਰਟ ਖਰੀਦ ਸ਼ਡਿਊਲਿੰਗ",
            hr: "स्मार्ट खरीद शेड्यूलिंग",
            bn: "স্মার্ট ক্রয় শিডিউলিং",
            mr: "स्मार्ट खरेदी शेड्यूलिंग",
            gu: "સ્માર્ટ ખરીદી શેડ્યૂલિંગ",
            ta: "ஸ்மார்ட் கொள்முதல் திட்டமிடல்",
            te: "స్మార్ట్ కొనుగోలు షెడ్యూలింగ్",
            kn: "ಸ್ಮಾರ್ಟ್ ಖರೀದಿ ವೇಳಾಪಟ್ಟಿ",
            ml: "സ്മാർട്ട് സംഭരണ ഷെഡ്യൂളിംഗ്",
            or: "ସ୍ମାର୍ଟ କ୍ରୟ ସୂଚୀ",
            as: "স্মাৰ্ট ক্ৰয় সময়সূচী",
            ur: "اسمارٹ خریداری شیڈولنگ"
        },

        "Team Code Cultivators": {
            hi: "टीम कोड कल्टीवेटर्स",
            pa: "ਟੀਮ ਕੋਡ ਕਲਟੀਵੇਟਰਜ਼",
            hr: "टीम कोड कल्टीवेटर्स",
            bn: "টিম কোড কাল্টিভেটরস",
            mr: "टीम कोड कल्टिवेटर्स",
            gu: "ટીમ કોડ કલ્ટિવેટર્સ",
            ta: "டீம் கோட் கல்டிவேட்டர்ஸ்",
            te: "టీమ్ కోడ్ కల్టివేటర్స్",
            kn: "ಟೀಮ್ ಕೋಡ್ ಕಲ್ಟಿವೇಟರ್ಸ್",
            ml: "ടീം കോഡ് കൾട്ടിവേറ്റേഴ്സ്",
            or: "ଟିମ୍ କୋଡ୍ କଲ୍ଟିଭେଟର୍ସ",
            as: "টীম ক'ড কাল্টিভেটৰ্ছ",
            ur: "ٹیم کوڈ کلٹیویٹرز"
        },

        "Reset Demo": {
            hi: "डेमो रीसेट करें",
            pa: "ਡੈਮੋ ਰੀਸੈਟ ਕਰੋ",
            hr: "डेमो रीसेट करें",
            bn: "ডেমো রিসেট করুন",
            mr: "डेमो रीसेट करा",
            gu: "ડેમો રીસેટ કરો",
            ta: "டெமோ மீட்டமை",
            te: "డెమో రీసెట్ చేయండి",
            kn: "ಡೆಮೊ ಮರುಹೊಂದಿಸಿ",
            ml: "ഡെമോ റീസെറ്റ് ചെയ്യുക",
            or: "ଡେମୋ ରିସେଟ୍ କରନ୍ତୁ",
            as: "ডেমো ৰিছেট কৰক",
            ur: "ڈیمو ری سیٹ کریں"
        },

        // =========================
        // PROCUREMENT STATUS
        // =========================

        "Accepted Quantity": {
            hi: "स्वीकृत मात्रा",
            pa: "ਮਨਜ਼ੂਰ ਕੀਤੀ ਮਾਤਰਾ",
            hr: "स्वीकृत मात्रा",
            bn: "গৃহীত পরিমাণ",
            mr: "स्वीकृत मात्रा",
            gu: "સ્વીકૃત જથ્થો",
            ta: "ஏற்றுக்கொள்ளப்பட்ட அளவு",
            te: "ఆమోదించిన పరిమాణం",
            kn: "ಸ್ವೀಕರಿಸಿದ ಪ್ರಮಾಣ",
            ml: "സ്വീകരിച്ച അളവ്",
            or: "ଗ୍ରହଣ କରାଯାଇଥିବା ପରିମାଣ",
            as: "গ্ৰহণ কৰা পৰিমাণ",
            ur: "منظور شدہ مقدار"
        },

        "Rejected Quantity": {
            hi: "अस्वीकृत मात्रा",
            pa: "ਰੱਦ ਕੀਤੀ ਮਾਤਰਾ",
            hr: "अस्वीकृत मात्रा",
            bn: "প্রত্যাখ্যাত পরিমাণ",
            mr: "नाकारलेली मात्रा",
            gu: "નકારાયેલ જથ્થો",
            ta: "நிராகரிக்கப்பட்ட அளவு",
            te: "తిరస్కరించిన పరిమాణం",
            kn: "ತಿರಸ್ಕರಿಸಿದ ಪ್ರಮಾಣ",
            ml: "നിരസിച്ച അളവ്",
            or: "ପ୍ରତ୍ୟାଖ୍ୟାନ ପରିମାଣ",
            as: "প্ৰত্যাখ্যান কৰা পৰিমাণ",
            ur: "مسترد شدہ مقدار"
        },

        "MSP Rate": {
            hi: "MSP दर",
            pa: "MSP ਦਰ",
            hr: "MSP दर",
            bn: "MSP হার",
            mr: "MSP दर",
            gu: "MSP દર",
            ta: "MSP விலை",
            te: "MSP రేటు",
            kn: "MSP ದರ",
            ml: "MSP നിരക്ക്",
            or: "MSP ହାର",
            as: "MSP হাৰ",
            ur: "MSP شرح"
        },

        "Total Payable": {
            hi: "कुल देय राशि",
            pa: "ਕੁੱਲ ਭੁਗਤਾਨਯੋਗ ਰਕਮ",
            hr: "कुल देय राशि",
            bn: "মোট প্রদেয়",
            mr: "एकूण देय रक्कम",
            gu: "કુલ ચૂકવવાપાત્ર",
            ta: "மொத்த செலுத்த வேண்டிய தொகை",
            te: "మొత్తం చెల్లించాల్సిన మొత్తం",
            kn: "ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ",
            ml: "ആകെ നൽകേണ്ട തുക",
            or: "ମୋଟ ଦେୟ",
            as: "মুঠ পৰিশোধযোগ্য",
            ur: "کل قابل ادائیگی"
        },

        "Payment Status": {
            hi: "भुगतान स्थिति",
            pa: "ਭੁਗਤਾਨ ਸਥਿਤੀ",
            hr: "भुगतान स्थिति",
            bn: "পেমেন্টের অবস্থা",
            mr: "पेमेंट स्थिती",
            gu: "ચુકવણી સ્થિતિ",
            ta: "கட்டண நிலை",
            te: "చెల్లింపు స్థితి",
            kn: "ಪಾವತಿ ಸ್ಥಿತಿ",
            ml: "പേയ്മെന്റ് നില",
            or: "ପେମେଣ୍ଟ ସ୍ଥିତି",
            as: "পেমেণ্ট স্থিতি",
            ur: "ادائیگی کی صورتحال"
        },

        "Payment Stage": {
            hi: "भुगतान चरण",
            pa: "ਭੁਗਤਾਨ ਪੜਾਅ",
            hr: "भुगतान चरण",
            bn: "পেমেন্ট ধাপ",
            mr: "पेमेंट टप्पा",
            gu: "ચુકવણી તબક્કો",
            ta: "கட்டண நிலை",
            te: "చెల్లింపు దశ",
            kn: "ಪಾವತಿ ಹಂತ",
            ml: "പേയ്മെന്റ് ഘട്ടം",
            or: "ପେମେଣ୍ଟ ପର୍ଯ୍ୟାୟ",
            as: "পেমেণ্ট পৰ্যায়",
            ur: "ادائیگی کا مرحلہ"
        },

        "Receipt": {
            hi: "रसीद",
            pa: "ਰਸੀਦ",
            hr: "रसीद",
            bn: "রসিদ",
            mr: "पावती",
            gu: "રસીદ",
            ta: "ரசீது",
            te: "రసీదు",
            kn: "ರಸೀದಿ",
            ml: "രസീത്",
            or: "ରସିଦ",
            as: "ৰচিদ",
            ur: "رسید"
        },

        // =========================
        // WORKFLOW
        // =========================

        "Registration": {
            hi: "पंजीकरण",
            pa: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
            hr: "पंजीकरण",
            bn: "নিবন্ধন",
            mr: "नोंदणी",
            gu: "નોંધણી",
            ta: "பதிவு",
            te: "నమోదు",
            kn: "ನೋಂದಣಿ",
            ml: "രജിസ്ട്രേഷൻ",
            or: "ପଞ୍ଜୀକରଣ",
            as: "পঞ্জীয়ন",
            ur: "رجسٹریشن"
        },

        "Centre Selection": {
            hi: "केंद्र चयन",
            pa: "ਕੇਂਦਰ ਚੋਣ",
            hr: "केंद्र चयन",
            bn: "কেন্দ্র নির্বাচন",
            mr: "केंद्र निवड",
            gu: "કેન્દ્ર પસંદગી",
            ta: "மையத் தேர்வு",
            te: "కేంద్ర ఎంపిక",
            kn: "ಕೇಂದ್ರ ಆಯ್ಕೆ",
            ml: "കേന്ദ്ര തിരഞ്ഞെടുപ്പ്",
            or: "କେନ୍ଦ୍ର ଚୟନ",
            as: "কেন্দ্ৰ নিৰ্বাচন",
            ur: "مرکز کا انتخاب"
        },

        "Token & Slot": {
            hi: "टोकन और स्लॉट",
            pa: "ਟੋਕਨ ਅਤੇ ਸਲਾਟ",
            hr: "टोकन और स्लॉट",
            bn: "টোকেন ও স্লট",
            mr: "टोकन आणि स्लॉट",
            gu: "ટોકન અને સ્લોટ",
            ta: "டோக்கன் மற்றும் ஸ்லாட்",
            te: "టోకెన్ మరియు స్లాట్",
            kn: "ಟೋಕನ್ ಮತ್ತು ಸ್ಲಾಟ್",
            ml: "ടോക്കൺ & സ്ലോട്ട്",
            or: "ଟୋକେନ୍ ଏବଂ ସ୍ଲଟ୍",
            as: "টোকেন আৰু স্লট",
            ur: "ٹوکن اور سلاٹ"
        },

        "Travel": {
            hi: "यात्रा",
            pa: "ਯਾਤਰਾ",
            hr: "यात्रा",
            bn: "যাত্রা",
            mr: "प्रवास",
            gu: "મુસાફરી",
            ta: "பயணம்",
            te: "ప్రయాణం",
            kn: "ಪ್ರಯಾಣ",
            ml: "യാത്ര",
            or: "ଯାତ୍ରା",
            as: "যাত্ৰা",
            ur: "سفر"
        },

        "Queue Monitoring": {
            hi: "कतार निगरानी",
            pa: "ਕਤਾਰ ਨਿਗਰਾਨੀ",
            hr: "कतार निगरानी",
            bn: "সারি পর্যবেক্ষণ",
            mr: "रांग निरीक्षण",
            gu: "કતાર મોનિટરિંગ",
            ta: "வரிசை கண்காணிப்பு",
            te: "క్యూ పర్యవేక్షణ",
            kn: "ಸರತಿ ಮೇಲ್ವಿಚಾರಣೆ",
            ml: "ക്യൂ നിരീക്ഷണം",
            or: "କ୍ୟୁ ନିରୀକ୍ଷଣ",
            as: "শাৰী নিৰীক্ষণ",
            ur: "قطار کی نگرانی"
        },

        "Delay Detection": {
            hi: "देरी का पता लगाना",
            pa: "ਦੇਰੀ ਦਾ ਪਤਾ ਲਗਾਉਣਾ",
            hr: "देरी का पता लगाना",
            bn: "বিলম্ব শনাক্তকরণ",
            mr: "विलंब शोध",
            gu: "વિલંબ શોધ",
            ta: "தாமதத்தைக் கண்டறிதல்",
            te: "ఆలస్యం గుర్తింపు",
            kn: "ವಿಳಂಬ ಪತ್ತೆ",
            ml: "കാലതാമസം കണ്ടെത്തൽ",
            or: "ବିଳମ୍ବ ଚିହ୍ନଟ",
            as: "পলম চিনাক্তকৰণ",
            ur: "تاخیر کا پتہ لگانا"
        },

        // =========================
        // BUTTONS
        // =========================

        "Save": {
            hi: "सहेजें",
            pa: "ਸੇਵ ਕਰੋ",
            hr: "सेव करें",
            bn: "সংরক্ষণ করুন",
            mr: "जतन करा",
            gu: "સાચવો",
            ta: "சேமி",
            te: "సేవ్ చేయండి",
            kn: "ಉಳಿಸಿ",
            ml: "സേവ് ചെയ്യുക",
            or: "ସେଭ୍ କରନ୍ତୁ",
            as: "সংৰক্ষণ কৰক",
            ur: "محفوظ کریں"
        },

        "Submit": {
            hi: "जमा करें",
            pa: "ਜਮ੍ਹਾਂ ਕਰੋ",
            hr: "जमा करें",
            bn: "জমা দিন",
            mr: "सबमिट करा",
            gu: "સબમિટ કરો",
            ta: "சமர்ப்பிக்கவும்",
            te: "సమర్పించండి",
            kn: "ಸಲ್ಲಿಸಿ",
            ml: "സമർപ്പിക്കുക",
            or: "ଦାଖଲ କରନ୍ତୁ",
            as: "দাখিল কৰক",
            ur: "جمع کریں"
        },

        "Next": {
            hi: "आगे",
            pa: "ਅੱਗੇ",
            hr: "आगे",
            bn: "পরবর্তী",
            mr: "पुढे",
            gu: "આગળ",
            ta: "அடுத்து",
            te: "తదుపరి",
            kn: "ಮುಂದೆ",
            ml: "അടുത്തത്",
            or: "ପରବର୍ତ୍ତୀ",
            as: "পৰৱৰ্তী",
            ur: "اگلا"
        },

        "Back": {
            hi: "पीछे",
            pa: "ਪਿੱਛੇ",
            hr: "पीछे",
            bn: "পিছনে",
            mr: "मागे",
            gu: "પાછળ",
            ta: "பின்",
            te: "వెనుకకు",
            kn: "ಹಿಂದೆ",
            ml: "പിന്നിലേക്ക്",
            or: "ପଛକୁ",
            as: "পিছলৈ",
            ur: "پیچھے"
        },

        "Cancel": {
            hi: "रद्द करें",
            pa: "ਰੱਦ ਕਰੋ",
            hr: "रद्द करें",
            bn: "বাতিল করুন",
            mr: "रद्द करा",
            gu: "રદ કરો",
            ta: "ரத்து செய்",
            te: "రద్దు చేయండి",
            kn: "ರದ್ದುಮಾಡಿ",
            ml: "റദ്ദാക്കുക",
            or: "ବାତିଲ୍ କରନ୍ତୁ",
            as: "বাতিল কৰক",
            ur: "منسوخ کریں"
        },

        "View Details": {
            hi: "विवरण देखें",
            pa: "ਵੇਰਵੇ ਵੇਖੋ",
            hr: "विवरण देखें",
            bn: "বিস্তারিত দেখুন",
            mr: "तपशील पहा",
            gu: "વિગતો જુઓ",
            ta: "விவரங்களைக் காண்க",
            te: "వివరాలను చూడండి",
            kn: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
            ml: "വിശദാംശങ്ങൾ കാണുക",
            or: "ବିବରଣୀ ଦେଖନ୍ତୁ",
            as: "বিৱৰণ চাওক",
            ur: "تفصیلات دیکھیں"
        }
    };

    // ============================================
    // GET CURRENT LANGUAGE
    // ============================================

    function getLanguage() {
        return localStorage.getItem(LANGUAGE_KEY) || "en";
    }

    // ============================================
    // SAVE LANGUAGE
    // ============================================

    function setLanguage(lang) {
        if (!languages[lang]) {
            lang = "en";
        }

        localStorage.setItem(LANGUAGE_KEY, lang);
        translatePage(lang);

        // Update selector if present
        const selectors = [
            document.getElementById("languageSelect"),
            document.getElementById("languageSelector"),
            document.getElementById("langSelect")
        ];

        selectors.forEach((select) => {
            if (select) {
                select.value = lang;
            }
        });

        document.documentElement.setAttribute("lang", lang);

        // Optional event for other modules
        document.dispatchEvent(
            new CustomEvent("languageChanged", {
                detail: { language: lang }
            })
        );
    }

    // ============================================
    // TRANSLATE TEXT
    // ============================================

    function translateText(text, lang) {
        if (!text) return text;

        const cleanText = text.trim();

        if (lang === "en") {
            return cleanText;
        }

        if (
            translations[cleanText] &&
            translations[cleanText][lang]
        ) {
            return translations[cleanText][lang];
        }

        return cleanText;
    }

    // ============================================
    // TRANSLATE DATA-I18N ELEMENTS
    // ============================================

    function translateMarkedElements(lang) {

        document.querySelectorAll("[data-i18n]").forEach((element) => {

            const key = element.getAttribute("data-i18n");

            if (!translations[key]) {
                return;
            }

            if (lang === "en") {
                element.textContent = key;
                return;
            }

            if (translations[key][lang]) {
                element.textContent = translations[key][lang];
            }
        });
    }

    // ============================================
    // TRANSLATE COMMON TEXT NODES
    // ============================================

    function translateTextNodes(lang) {

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {

                    // Ignore script/style
                    const parent = node.parentElement;

                    if (!parent) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (
                        parent.tagName === "SCRIPT" ||
                        parent.tagName === "STYLE"
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    const value = node.nodeValue.trim();

                    if (!value) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodes = [];

        let node;

        while ((node = walker.nextNode())) {
            nodes.push(node);
        }

        nodes.forEach((textNode) => {

            const original = textNode.nodeValue;

            const trimmed = original.trim();

            if (!translations[trimmed]) {
                return;
            }

            const translated = translateText(trimmed, lang);

            if (translated !== trimmed) {

                const startSpace =
                    original.match(/^\s*/)?.[0] || "";

                const endSpace =
                    original.match(/\s*$/)?.[0] || "";

                textNode.nodeValue =
                    startSpace +
                    translated +
                    endSpace;
            }
        });
    }

    // ============================================
    // SPECIAL NAVIGATION SUPPORT
    // ============================================

    function translateNavigation(lang) {

        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            const target = link.getAttribute("data-nav-target");

            let key = null;

            switch (target) {

                case "home":
                    key = "Home";
                    break;

                case "registration":
                    key = "Farmer Registration";
                    break;

                case "recommendation":
                    key = "Centres";
                    break;

                case "scheduling":
                    key = "Token & Slot";
                    break;

                case "queue":
                    key = "Live Queue";
                    break;

                case "tracking":
                    key = "Tracking";
                    break;

                case "rescheduling":
                    key = "Rescheduling";
                    break;

                case "status":
                    key = "Procurement Status";
                    break;

                case "notifications":
                    key = "Alerts";
                    break;

                case "judge-demo":
                    key = "Judge Demo (16 Steps)";
                    break;
            }

            if (!key || !translations[key]) {
                return;
            }

            const translated = translateText(key, lang);

            /*
             * Preserve notification count badge
             */
            const badge = link.querySelector(".badge-count");

            if (badge) {

                link.childNodes.forEach((child) => {

                    if (child.nodeType === Node.TEXT_NODE) {

                        if (child.nodeValue.trim()) {
                            child.nodeValue = "🔔 " + translated + " ";
                        }

                    }

                });

            } else {

                // Preserve emoji if possible
                const emojiMatch = link.textContent.match(/^[^\w\u0900-\u097F]+/);

                const emoji = emojiMatch
                    ? emojiMatch[0]
                    : "";

                link.textContent = emoji + translated;
            }
        });
    }

    // ============================================
    // LANGUAGE SELECTOR
    // ============================================

    function createLanguageSelector() {

        let select =
            document.getElementById("languageSelect") ||
            document.getElementById("languageSelector") ||
            document.getElementById("langSelect");

        /*
         * If HTML already contains selector,
         * use that selector.
         */
        if (select) {

            populateSelector(select);

            select.value = getLanguage();

            select.addEventListener("change", function () {
                setLanguage(this.value);
            });

            return;
        }

        /*
         * Otherwise create selector automatically.
         */

        const headerActions =
            document.querySelector(".header-actions");

        const nav =
            document.querySelector(".main-nav");

        const parent =
            headerActions || nav || document.body;

        const wrapper = document.createElement("div");

        wrapper.className = "language-selector-wrapper";

        wrapper.style.display = "inline-flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "6px";
        wrapper.style.margin = "0 8px";

        const label = document.createElement("span");

        label.textContent = "🌐";

        label.setAttribute("aria-label", "Language");

        select = document.createElement("select");

        select.id = "languageSelect";

        select.className = "language-select";

        select.setAttribute(
            "aria-label",
            "Select Language"
        );

        populateSelector(select);

        select.value = getLanguage();

        select.addEventListener("change", function () {
            setLanguage(this.value);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(select);

        /*
         * Put language selector in header.
         */
        if (headerActions) {
            headerActions.insertBefore(
                wrapper,
                headerActions.firstChild
            );
        } else {
            parent.insertBefore(
                wrapper,
                parent.firstChild
            );
        }
    }

    // ============================================
    // POPULATE LANGUAGE SELECT
    // ============================================

    function populateSelector(select) {

        if (select.options.length > 0) {
            return;
        }

        Object.entries(languages).forEach(
            ([code, name]) => {

                const option =
                    document.createElement("option");

                option.value = code;

                option.textContent = name;

                select.appendChild(option);
            }
        );
    }

    // ============================================
    // MAIN TRANSLATION FUNCTION
    // ============================================

    function translatePage(lang) {

        /*
         * First translate elements explicitly marked
         * with data-i18n.
         */
        translateMarkedElements(lang);

        /*
         * Translate common text automatically.
         */
        translateTextNodes(lang);

        /*
         * Translate navigation.
         */
        translateNavigation(lang);

        /*
         * Update document language.
         */
        document.documentElement.setAttribute(
            "lang",
            lang
        );
    }

    // ============================================
    // INITIALIZE
    // ============================================

    function initLanguageSystem() {

        createLanguageSelector();

        const currentLanguage = getLanguage();

        translatePage(currentLanguage);

        console.log(
            "Language system initialized:",
            languages[currentLanguage]
        );
    }

    // ============================================
    // DOM READY
    // ============================================

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initLanguageSystem
        );

    } else {

        initLanguageSystem();
    }

    // ============================================
    // PUBLIC API
    // ============================================

    window.LanguageSystem = {

        setLanguage,

        getLanguage,

        translatePage,

        languages
    };

})();