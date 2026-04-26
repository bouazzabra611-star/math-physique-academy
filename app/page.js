"use client";
import PDFViewer from '../components/PDFViewer';
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Atom, Menu, X, Globe, Sparkles, ArrowRight,
  BookOpen, Award, Heart, ChevronRight, GraduationCap,
  Calculator, FlaskConical, CheckCircle, Target, Download,
  TrendingUp, Smartphone, Zap, Users, Clock,
  Star, Quote, Plus, Minus, HelpCircle, Rocket,
  ChevronLeft, Home, Layers, FileText, PenTool, Bookmark, Lightbulb,
  Search, Filter, Play, Eye, Flame,
  List, Info, BookMarked, Share2, Printer, ArrowUpRight,
  LogIn, LogOut, UserCircle, BarChart3, Trophy,
  MessageCircle, Video, Camera, Send, Mail, Phone, MapPin
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   🌍 نظام إدارة اللغتين (العربية والفرنسية)
   نستعمل React Context لمشاركة اللغة بين جميع المكونات
═══════════════════════════════════════════════════════════════ */
const LangContext = createContext();
const useLang = () => useContext(LangContext);

/* ═══════════════════════════════════════════════════════════════
   🧭 نظام التنقل الداخلي (Router بسيط)
   يدير الانتقال بين الصفحات بدون مكتبات خارجية
   - page: { name: "home" | "level" | "subject" | "course" ...
   -        levelId, subjectId, courseId }
═══════════════════════════════════════════════════════════════ */
const RouterContext = createContext();
const useRouter = () => useContext(RouterContext);

// 📚 قاموس الترجمات - كل النصوص في مكان واحد
const translations = {
  fr: {
    siteName: "Math & Physique Academy",
    tagline: "L'excellence à portée de main",
    nav: {
      home: "Accueil",
      levels: "Niveaux",
      subjects: "Matières",
      exams: "Examens",
      quiz: "Quiz",
      dashboard: "Mon espace"
    },
    hero: {
      badge: "Plateforme éducative N°1 au Maroc 🇲🇦",
      title1: "Maîtrisez les",
      title2: "Maths & Physique",
      title3: "en toute confiance",
      subtitle: "Des cours clairs, des exercices corrigés et des examens selon le programme marocain — du collège au baccalauréat.",
      cta1: "Commencer maintenant",
      cta2: "Découvrir les cours",
      stats: {
        levels: "Niveaux",
        courses: "Cours",
        exercises: "Exercices",
        students: "Élèves"
      }
    },
    levels: {
      badge: "📚 Tous les niveaux",
      title: "Choisissez votre niveau",
      subtitle: "Un parcours pédagogique complet du collège au baccalauréat",
      cta: "Explorer ce niveau",
      courses: "cours",
      items: [
        { short: "1APIC", name: "1ère Année Collège", desc: "Les bases fondamentales des maths et sciences", count: 24 },
        { short: "2APIC", name: "2ème Année Collège", desc: "Approfondir les concepts essentiels", count: 28 },
        { short: "3APIC", name: "3ème Année Collège", desc: "Préparation au lycée en toute sérénité", count: 32 },
        { short: "TCS", name: "Tronc Commun Scientifique", desc: "Première étape du baccalauréat scientifique", count: 35 },
        { short: "1BAC", name: "1ère Bac Sciences", desc: "Maîtrise des outils mathématiques avancés", count: 42 },
        { short: "2BAC", name: "2ème Bac Sciences", desc: "Préparation finale pour l'examen national", count: 48 }
      ]
    },
    subjects: {
      badge: "⚡ Nos disciplines",
      title: "Deux matières, une excellence",
      subtitle: "Des cours élaborés par des enseignants expérimentés du système marocain",
      cta: "Explorer la matière",
      math: {
        name: "Mathématiques",
        tagline: "Logique • Précision • Maîtrise",
        desc: "Algèbre, géométrie, analyse, probabilités et statistiques. Tous les chapitres du programme marocain expliqués avec clarté.",
        topics: ["Algèbre", "Géométrie", "Analyse", "Probabilités", "Statistiques", "Trigonométrie"]
      },
      physics: {
        name: "Physique-Chimie",
        tagline: "Découvrir • Comprendre • Expérimenter",
        desc: "Mécanique, électricité, optique, chimie organique et minérale. Théorie et pratique pour une compréhension profonde.",
        topics: ["Mécanique", "Électricité", "Optique", "Thermodynamique", "Chimie", "Ondes"]
      }
    },
    advantages: {
      badge: "✨ Pourquoi nous choisir",
      title: "Une approche pédagogique unique",
      subtitle: "Tout ce qu'il faut pour réussir, en un seul endroit",
      items: [
        { title: "Cours structurés", desc: "Leçons claires suivant le programme officiel marocain à 100%" },
        { title: "Corrigés détaillés", desc: "Chaque exercice expliqué étape par étape pour bien comprendre" },
        { title: "Quiz interactifs", desc: "Testez vos connaissances avec correction automatique instantanée" },
        { title: "PDF téléchargeables", desc: "Tous les cours, exercices et examens en format PDF imprimable" },
        { title: "Suivi de progression", desc: "Tableau de bord personnel pour suivre votre évolution" },
        { title: "Accessible partout", desc: "Mobile, tablette, ordinateur — apprenez où vous voulez" }
      ]
    },
    testimonials: {
      badge: "💬 Témoignages",
      title: "Ils ont réussi avec nous",
      subtitle: "Plus de 2,500 élèves nous font confiance chaque année",
      items: [
        {
          name: "Yassine El Khattabi",
          level: "2ème Bac SM — Casablanca",
          rating: 5,
          msg: "Grâce aux cours de Prof Bouazza, j'ai obtenu 18/20 au baccalauréat national. Les explications sont claires et les exercices vraiment utiles !"
        },
        {
          name: "Salma Bennani",
          level: "1ère Bac SP — Rabat",
          rating: 5,
          msg: "Les corrections détaillées m'ont aidée à comprendre mes erreurs. Je recommande vivement à tous les élèves qui veulent exceller en physique."
        },
        {
          name: "Omar Tazi",
          level: "3ème Année Collège — Fès",
          rating: 5,
          msg: "Plateforme très bien organisée et facile à utiliser. Les quiz interactifs me motivent à réviser tous les jours après l'école."
        },
        {
          name: "Aya Mansouri",
          level: "TCS — Marrakech",
          rating: 5,
          msg: "J'avais beaucoup de difficultés en mathématiques. Maintenant, je suis parmi les meilleurs de ma classe. Merci infiniment !"
        }
      ]
    },
    faq: {
      badge: "❓ Questions fréquentes",
      title: "Tout ce que vous devez savoir",
      subtitle: "Vous avez une question ? Nous avons probablement la réponse",
      contactCta: "Une autre question ?",
      contactBtn: "Contactez-nous",
      items: [
        {
          q: "Le contenu est-il conforme au programme officiel marocain ?",
          a: "Oui, absolument. Tous nos cours, exercices et examens sont élaborés en stricte conformité avec le programme officiel du Ministère de l'Éducation Nationale du Maroc. Notre équipe pédagogique met à jour le contenu chaque année."
        },
        {
          q: "L'accès à la plateforme est-il gratuit ?",
          a: "La majorité de nos cours et exercices sont accessibles gratuitement. Certains contenus premium (examens corrigés détaillés, vidéos exclusives) nécessitent un abonnement à prix très abordable pour les élèves marocains."
        },
        {
          q: "Puis-je télécharger les cours en PDF ?",
          a: "Oui ! Tous nos cours, fiches de révision et examens sont disponibles en téléchargement PDF. Vous pouvez les imprimer et les étudier hors ligne, à votre rythme."
        },
        {
          q: "La plateforme fonctionne-t-elle sur mobile ?",
          a: "Bien sûr ! Notre site est totalement responsive : il s'adapte parfaitement aux smartphones, tablettes et ordinateurs. Vous pouvez apprendre où vous voulez, quand vous voulez."
        },
        {
          q: "Comment fonctionne le suivi de progression ?",
          a: "Une fois inscrit, vous avez accès à un tableau de bord personnel qui suit vos cours visionnés, exercices résolus, quiz réussis et votre évolution dans chaque matière."
        },
        {
          q: "Y a-t-il un service d'aide ou de support ?",
          a: "Oui, vous pouvez nous contacter via WhatsApp au 06 20 54 03 77 ou par email. Notre équipe répond généralement sous 24 heures pour vous aider avec toute question pédagogique ou technique."
        }
      ]
    },
    cta: {
      title: "Prêt à exceller en maths et physique ?",
      subtitle: "Rejoignez plus de 2,500 élèves marocains qui transforment leurs résultats grâce à notre plateforme.",
      btn1: "Commencer gratuitement",
      btn2: "Voir une démo",
      benefit1: "✓ Aucune carte bancaire requise",
      benefit2: "✓ Accès immédiat à 150+ cours",
      benefit3: "✓ Annulation à tout moment"
    },
    levelPage: {
      back: "Retour aux niveaux",
      welcome: "Bienvenue en",
      chooseSubject: "Choisissez votre matière",
      chooseSubjectSub: "Sélectionnez la matière que vous souhaitez étudier",
      stats: {
        chapters: "Chapitres",
        exercises: "Exercices",
        exams: "Examens",
        students: "Élèves inscrits"
      },
      math: {
        name: "Mathématiques",
        desc: "Algèbre, géométrie, analyse et plus encore",
        chapters: 12
      },
      physics: {
        name: "Physique-Chimie",
        desc: "Mécanique, électricité, optique et chimie",
        chapters: 10
      },
      explore: "Commencer la matière",
      programme: "Programme officiel",
      programmeDesc: "Tous les chapitres conformes au programme du Ministère de l'Éducation Nationale du Maroc"
    },
    subjectPage: {
      backToLevel: "Retour",
      search: "Rechercher un cours, un exercice...",
      filter: "Filtrer",
      tabs: {
        courses: "Cours",
        exercises: "Exercices",
        exams: "Examens",
        summaries: "Résumés",
        tips: "Astuces"
      },
      difficulty: {
        all: "Tous",
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile"
      },
      popular: "Populaire",
      start: "Commencer",
      chapter: "Chapitre",
      noResults: "Aucun résultat trouvé",
      noResultsDesc: "Essayez avec d'autres mots-clés",
      comingSoon: {
        exercises: "Les exercices corrigés arrivent bientôt",
        exams: "Les examens des années précédentes avec corrections",
        summaries: "Des résumés concis de tous les chapitres",
        tips: "Astuces et méthodes pour réussir"
      }
    },
    coursePage: {
      backToSubject: "Retour aux cours",
      tableOfContents: "Table des matières",
      sections: {
        intro: "Introduction",
        lesson: "Leçon complète",
        examples: "Exemples expliqués",
        summary: "Résumé clé"
      },
      actions: {
        download: "Télécharger PDF",
        exercises: "Voir les exercices",
        share: "Partager",
        print: "Imprimer",
        bookmark: "Favori"
      },
      meta: {
        duration: "Durée estimée",
        difficulty: "Difficulté",
        views: "vues",
        chapter: "Chapitre"
      },
      introText: "Ce chapitre pose les bases essentielles que vous utiliserez tout au long de votre parcours. Nous aborderons les définitions clés, les propriétés importantes et leurs applications pratiques avec des exemples concrets.",
      lessonIntro: "La leçon se divise en plusieurs parties logiques, construites de façon progressive pour une compréhension profonde.",
      definitionLabel: "Définition",
      definitionText: "Il s'agit d'un concept central qui relie les notions précédentes à celles qui suivront. Maîtriser cette définition est essentiel pour la suite.",
      propertyLabel: "Propriété fondamentale",
      propertyText: "Cette propriété se vérifie dans tous les cas d'application du théorème, et constitue un outil puissant pour résoudre de nombreux problèmes.",
      exampleLabel: "Exemple",
      examples: [
        {
          title: "Application directe",
          desc: "Résoudre un cas simple en appliquant la définition. On identifie d'abord les éléments donnés, puis on applique la formule correspondante étape par étape."
        },
        {
          title: "Cas pratique",
          desc: "Un problème concret du type examen national. Solution détaillée avec justifications à chaque étape pour bien comprendre la méthode."
        },
        {
          title: "Cas avancé",
          desc: "Application à un problème complexe nécessitant la combinaison de plusieurs propriétés. Méthode rigoureuse avec analyse approfondie."
        }
      ],
      summaryPoints: [
        "Concept fondamental assimilé et maîtrisé",
        "Formules clés apprises par cœur",
        "Applications pratiques comprises",
        "Prêt à aborder les exercices"
      ],
      nextStep: "Prochaine étape",
      nextStepDesc: "Testez vos connaissances avec les exercices corrigés",
      relatedCourses: "Cours recommandés",
      relatedCoursesSub: "Continuez votre apprentissage avec ces chapitres connexes"
    },
    footer: {
      about: "À propos",
      aboutText: "Plateforme éducative dédiée aux élèves marocains pour exceller en mathématiques et en physique-chimie.",
      quickLinks: "Liens rapides",
      contact: "Contact",
      follow: "Suivez-nous",
      rights: "Tous droits réservés",
      madeBy: "Conçu par"
    }
  },
  ar: {
    siteName: "أكاديمية الرياضيات والفيزياء",
    tagline: "التميز في متناول يديك",
    nav: {
      home: "الرئيسية",
      levels: "المستويات",
      subjects: "المواد",
      exams: "الامتحانات",
      quiz: "اختبارات",
      dashboard: "فضائي"
    },
    hero: {
      badge: "المنصة التعليمية الأولى بالمغرب 🇲🇦",
      title1: "أتقن",
      title2: "الرياضيات والفيزياء",
      title3: "بكل ثقة",
      subtitle: "دروس واضحة، تمارين مصححة وامتحانات وفق المنهاج المغربي — من الإعدادي إلى الباكالوريا.",
      cta1: "ابدأ الآن",
      cta2: "اكتشف الدروس",
      stats: {
        levels: "مستويات",
        courses: "دروس",
        exercises: "تمارين",
        students: "تلميذ"
      }
    },
    levels: {
      badge: "📚 جميع المستويات",
      title: "اختر مستواك الدراسي",
      subtitle: "مسار تعليمي كامل من الإعدادي إلى الباكالوريا",
      cta: "استكشف هذا المستوى",
      courses: "درس",
      items: [
        { short: "1APIC", name: "الأولى إعدادي", desc: "الأسس الأولى في الرياضيات والعلوم", count: 24 },
        { short: "2APIC", name: "الثانية إعدادي", desc: "تعميق المفاهيم الأساسية", count: 28 },
        { short: "3APIC", name: "الثالثة إعدادي", desc: "التحضير للثانوي بكل ثقة", count: 32 },
        { short: "TCS", name: "الجذع المشترك العلمي", desc: "الخطوة الأولى في الباكالوريا العلمية", count: 35 },
        { short: "1BAC", name: "الأولى باكالوريا علوم", desc: "إتقان الأدوات الرياضية المتقدمة", count: 42 },
        { short: "2BAC", name: "الثانية باكالوريا علوم", desc: "التحضير النهائي للامتحان الوطني", count: 48 }
      ]
    },
    subjects: {
      badge: "⚡ تخصصاتنا",
      title: "مادتان، تميز واحد",
      subtitle: "دروس من إعداد أساتذة ذوي خبرة في المنظومة المغربية",
      cta: "استكشف المادة",
      math: {
        name: "الرياضيات",
        tagline: "منطق • دقة • إتقان",
        desc: "الجبر، الهندسة، التحليل، الاحتمالات والإحصاء. جميع فصول المنهاج المغربي مشروحة بوضوح.",
        topics: ["الجبر", "الهندسة", "التحليل", "الاحتمالات", "الإحصاء", "المثلثات"]
      },
      physics: {
        name: "الفيزياء والكيمياء",
        tagline: "اكتشف • افهم • جرّب",
        desc: "الميكانيك، الكهرباء، البصريات، الكيمياء العضوية والمعدنية. نظرية وتطبيق لفهم عميق.",
        topics: ["الميكانيك", "الكهرباء", "البصريات", "الترموديناميك", "الكيمياء", "الموجات"]
      }
    },
    advantages: {
      badge: "✨ لماذا تختارنا",
      title: "منهجية تربوية فريدة",
      subtitle: "كل ما تحتاجه للنجاح، في مكان واحد",
      items: [
        { title: "دروس منظمة", desc: "دروس واضحة تتبع المنهاج الرسمي المغربي بنسبة 100%" },
        { title: "تصحيحات مفصلة", desc: "كل تمرين مشروح خطوة بخطوة لفهم جيد" },
        { title: "اختبارات تفاعلية", desc: "اختبر معلوماتك مع تصحيح تلقائي فوري" },
        { title: "ملفات PDF قابلة للتحميل", desc: "جميع الدروس والتمارين والامتحانات بصيغة PDF قابلة للطباعة" },
        { title: "تتبع التقدم", desc: "لوحة تحكم شخصية لمتابعة تطورك" },
        { title: "متاح في كل مكان", desc: "هاتف، لوحة، حاسوب — تعلم أينما شئت" }
      ]
    },
    testimonials: {
      badge: "💬 شهادات",
      title: "نجحوا معنا",
      subtitle: "أكثر من 2,500 تلميذ يثقون بنا كل سنة",
      items: [
        {
          name: "ياسين الخطابي",
          level: "الثانية باكالوريا علوم رياضية — الدار البيضاء",
          rating: 5,
          msg: "بفضل دروس الأستاذ بوعزة، حصلت على 18/20 في الباكالوريا الوطنية. الشروحات واضحة والتمارين مفيدة جداً!"
        },
        {
          name: "سلمى بناني",
          level: "الأولى باكالوريا علوم فيزيائية — الرباط",
          rating: 5,
          msg: "التصحيحات المفصلة ساعدتني على فهم أخطائي. أنصح بشدة جميع التلاميذ الذين يريدون التميز في الفيزياء."
        },
        {
          name: "عمر التازي",
          level: "الثالثة إعدادي — فاس",
          rating: 5,
          msg: "منصة منظمة جدا وسهلة الاستخدام. الاختبارات التفاعلية تحفزني على المراجعة كل يوم بعد المدرسة."
        },
        {
          name: "آية المنصوري",
          level: "الجذع المشترك العلمي — مراكش",
          rating: 5,
          msg: "كانت لدي صعوبات كثيرة في الرياضيات. الآن أنا من بين الأوائل في فصلي. شكراً جزيلاً!"
        }
      ]
    },
    faq: {
      badge: "❓ أسئلة شائعة",
      title: "كل ما تحتاج معرفته",
      subtitle: "هل لديك سؤال؟ إجابتنا هنا على الأرجح",
      contactCta: "سؤال آخر؟",
      contactBtn: "اتصل بنا",
      items: [
        {
          q: "هل المحتوى مطابق للمنهاج الرسمي المغربي؟",
          a: "نعم بشكل كامل. جميع دروسنا وتمارينا وامتحاناتنا معدة وفق المنهاج الرسمي لوزارة التربية الوطنية بالمغرب. فريقنا التربوي يحدّث المحتوى كل سنة."
        },
        {
          q: "هل الوصول إلى المنصة مجاني؟",
          a: "أغلب دروسنا وتمارينا متاحة مجاناً. بعض المحتويات المميزة (امتحانات بتصحيحات مفصلة، فيديوهات حصرية) تتطلب اشتراكاً بثمن مناسب جداً للتلاميذ المغاربة."
        },
        {
          q: "هل يمكنني تحميل الدروس بصيغة PDF؟",
          a: "نعم! جميع دروسنا، وملخصات المراجعة، والامتحانات متاحة للتحميل بصيغة PDF. يمكنك طباعتها ودراستها دون اتصال، وفق إيقاعك."
        },
        {
          q: "هل تعمل المنصة على الهاتف؟",
          a: "بالتأكيد! موقعنا متجاوب تماماً: يتكيف بشكل مثالي مع الهواتف الذكية واللوحات والحواسيب. يمكنك التعلم أينما وقتما تريد."
        },
        {
          q: "كيف يعمل تتبع التقدم؟",
          a: "بمجرد التسجيل، ستحصل على لوحة تحكم شخصية تتابع دروسك المشاهدة، تمارينك المحلولة، اختباراتك الناجحة وتطورك في كل مادة."
        },
        {
          q: "هل توجد خدمة دعم أو مساعدة؟",
          a: "نعم، يمكنك التواصل معنا عبر واتساب على الرقم 06 20 54 03 77 أو عبر البريد الإلكتروني. فريقنا يجيب عادةً خلال 24 ساعة لمساعدتك بأي سؤال تربوي أو تقني."
        }
      ]
    },
    cta: {
      title: "هل أنت مستعد للتميز في الرياضيات والفيزياء؟",
      subtitle: "انضم إلى أكثر من 2,500 تلميذ مغربي يحوّلون نتائجهم بفضل منصتنا.",
      btn1: "ابدأ مجاناً",
      btn2: "شاهد عرضاً تقديمياً",
      benefit1: "✓ لا حاجة لبطاقة بنكية",
      benefit2: "✓ وصول فوري إلى 150+ درس",
      benefit3: "✓ إلغاء في أي وقت"
    },
    levelPage: {
      back: "العودة إلى المستويات",
      welcome: "مرحبا بك في",
      chooseSubject: "اختر مادتك",
      chooseSubjectSub: "اختر المادة التي تريد دراستها",
      stats: {
        chapters: "فصول",
        exercises: "تمارين",
        exams: "امتحانات",
        students: "تلميذ مسجل"
      },
      math: {
        name: "الرياضيات",
        desc: "الجبر، الهندسة، التحليل والمزيد",
        chapters: 12
      },
      physics: {
        name: "الفيزياء والكيمياء",
        desc: "الميكانيك، الكهرباء، البصريات والكيمياء",
        chapters: 10
      },
      explore: "ابدأ المادة",
      programme: "المنهاج الرسمي",
      programmeDesc: "جميع الفصول مطابقة لمنهاج وزارة التربية الوطنية بالمغرب"
    },
    subjectPage: {
      backToLevel: "رجوع",
      search: "ابحث عن درس أو تمرين...",
      filter: "تصفية",
      tabs: {
        courses: "الدروس",
        exercises: "التمارين",
        exams: "الامتحانات",
        summaries: "ملخصات",
        tips: "نصائح"
      },
      difficulty: {
        all: "الكل",
        easy: "سهل",
        medium: "متوسط",
        hard: "صعب"
      },
      popular: "شائع",
      start: "ابدأ",
      chapter: "الفصل",
      noResults: "لا توجد نتائج",
      noResultsDesc: "جرب بكلمات بحث أخرى",
      comingSoon: {
        exercises: "التمارين المصححة قريباً",
        exams: "امتحانات السنوات السابقة مع التصحيحات",
        summaries: "ملخصات مركزة لجميع الفصول",
        tips: "نصائح وطرق للنجاح"
      }
    },
    coursePage: {
      backToSubject: "العودة إلى الدروس",
      tableOfContents: "فهرس المحتويات",
      sections: {
        intro: "مقدمة",
        lesson: "الدرس الكامل",
        examples: "أمثلة مشروحة",
        summary: "الملخص الأساسي"
      },
      actions: {
        download: "تحميل PDF",
        exercises: "شاهد التمارين",
        share: "مشاركة",
        print: "طباعة",
        bookmark: "مفضلة"
      },
      meta: {
        duration: "المدة المقدرة",
        difficulty: "الصعوبة",
        views: "مشاهدة",
        chapter: "الفصل"
      },
      introText: "يضع هذا الفصل الأسس الجوهرية التي ستستعملها طوال مسارك الدراسي. سنتناول التعاريف الأساسية، الخصائص المهمة وتطبيقاتها العملية مع أمثلة ملموسة.",
      lessonIntro: "ينقسم الدرس إلى عدة أجزاء منطقية، مبنية بشكل تدريجي من أجل فهم عميق ومتين.",
      definitionLabel: "تعريف",
      definitionText: "يتعلق الأمر بمفهوم محوري يربط بين المفاهيم السابقة والتي ستأتي لاحقاً. إتقان هذا التعريف ضروري لفهم ما يليه.",
      propertyLabel: "خاصية أساسية",
      propertyText: "تتحقق هذه الخاصية في جميع حالات تطبيق المبرهنة، وتشكل أداة قوية لحل العديد من المسائل.",
      exampleLabel: "مثال",
      examples: [
        {
          title: "تطبيق مباشر",
          desc: "حل حالة بسيطة بتطبيق التعريف. نحدد أولاً المعطيات، ثم نطبق الصيغة المناسبة خطوة بخطوة."
        },
        {
          title: "حالة تطبيقية",
          desc: "مسألة ملموسة من نوع الامتحان الوطني. حل مفصل مع التعليلات في كل خطوة لفهم المنهجية جيداً."
        },
        {
          title: "حالة متقدمة",
          desc: "تطبيق على مسألة معقدة تتطلب الجمع بين عدة خصائص. منهجية صارمة مع تحليل عميق."
        }
      ],
      summaryPoints: [
        "المفهوم الأساسي مستوعب ومتقن",
        "الصيغ الرئيسية محفوظة عن ظهر قلب",
        "التطبيقات العملية مفهومة",
        "جاهز لمواجهة التمارين"
      ],
      nextStep: "الخطوة التالية",
      nextStepDesc: "اختبر معلوماتك مع التمارين المصححة",
      relatedCourses: "دروس مقترحة",
      relatedCoursesSub: "تابع تعلمك مع هذه الفصول المرتبطة"
    },
    footer: {
      about: "عن الموقع",
      aboutText: "منصة تعليمية مخصصة للتلاميذ المغاربة للتفوق في الرياضيات والفيزياء والكيمياء.",
      quickLinks: "روابط سريعة",
      contact: "اتصل بنا",
      follow: "تابعنا",
      rights: "جميع الحقوق محفوظة",
      madeBy: "من إنجاز"
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   📚 بنك بيانات الدروس (Mock Data)
   منظم حسب المستوى والمادة - يمكن لاحقاً استبداله بـ API
═══════════════════════════════════════════════════════════════ */
const COURSES_DATA = {
  math: {
    "1apic": [
      { id: "m1", fr: "Les nombres entiers et décimaux", ar: "الأعداد الصحيحة والعشرية", duration: "45 min", level: "easy", popular: true },
      { id: "m2", fr: "Les fractions", ar: "الكسور", duration: "50 min", level: "easy", popular: false },
      { id: "m3", fr: "Proportionnalité", ar: "التناسبية", duration: "40 min", level: "easy", popular: true },
      { id: "m4", fr: "Géométrie du triangle", ar: "هندسة المثلث", duration: "55 min", level: "medium", popular: false },
      { id: "m5", fr: "Symétrie axiale", ar: "التماثل المحوري", duration: "45 min", level: "easy", popular: false }
    ],
    "2apic": [
      { id: "m6", fr: "Nombres rationnels", ar: "الأعداد العقدية", duration: "50 min", level: "medium", popular: true },
      { id: "m7", fr: "Calcul littéral", ar: "الحساب الحرفي", duration: "45 min", level: "medium", popular: false },
      { id: "m8", fr: "Théorème de Thalès", ar: "مبرهنة طاليس", duration: "60 min", level: "medium", popular: true },
      { id: "m9", fr: "Triangles et quadrilatères", ar: "المثلثات والرباعيات", duration: "50 min", level: "medium", popular: false }
    ],
    "3apic": [
      { id: "m10", fr: "Puissances et racines carrées", ar: "القوى والجذور المربعة", duration: "55 min", level: "medium", popular: true },
      { id: "m11", fr: "Équations et inéquations", ar: "المعادلات والمتراجحات", duration: "60 min", level: "hard", popular: true },
      { id: "m12", fr: "Théorème de Pythagore", ar: "مبرهنة فيثاغورس", duration: "50 min", level: "medium", popular: false },
      { id: "m13", fr: "Statistiques", ar: "الإحصاء", duration: "40 min", level: "easy", popular: false }
    ],
    "tcs": [
      { id: "m14", fr: "Les ensembles de nombres", ar: "مجموعات الأعداد", duration: "65 min", level: "hard", popular: true },
      { id: "m15", fr: "Calcul vectoriel dans le plan", ar: "الحساب المتجهي في المستوى", duration: "70 min", level: "hard", popular: true },
      { id: "m16", fr: "Trigonométrie", ar: "علم المثلثات", duration: "60 min", level: "hard", popular: false },
      { id: "m17", fr: "Équations et systèmes", ar: "المعادلات والأنظمة", duration: "55 min", level: "medium", popular: true }
    ],
    "1bac": [
      { id: "m18", fr: "Fonctions : limites et continuité", ar: "الدوال: النهايات والاتصال", duration: "75 min", level: "hard", popular: true },
      { id: "m19", fr: "Dérivation", ar: "الاشتقاق", duration: "80 min", level: "hard", popular: true },
      { id: "m20", fr: "Suites numériques", ar: "المتتاليات العددية", duration: "70 min", level: "hard", popular: true },
      { id: "m21", fr: "Produit scalaire", ar: "الجداء السلمي", duration: "60 min", level: "medium", popular: false }
    ],
    "2bac": [
      { id: "m22", fr: "Continuité et dérivabilité", ar: "الاتصال والاشتقاق", duration: "90 min", level: "hard", popular: true },
      { id: "m23", fr: "Fonction logarithme", ar: "الدالة اللوغاريتمية", duration: "85 min", level: "hard", popular: true },
      { id: "m24", fr: "Fonction exponentielle", ar: "الدالة الأسية", duration: "85 min", level: "hard", popular: true },
      { id: "m25", fr: "Nombres complexes", ar: "الأعداد العقدية", duration: "95 min", level: "hard", popular: true },
      { id: "m26", fr: "Calcul intégral", ar: "الحساب التكاملي", duration: "100 min", level: "hard", popular: true },
      { id: "m27", fr: "Équations différentielles", ar: "المعادلات التفاضلية", duration: "80 min", level: "hard", popular: false }
    ]
  },
  physics: {
    "1apic": [
      { id: "p1", fr: "L'eau dans notre environnement", ar: "الماء في محيطنا", duration: "40 min", level: "easy", popular: true },
      { id: "p2", fr: "L'électricité", ar: "الكهرباء", duration: "45 min", level: "easy", popular: true },
      { id: "p3", fr: "La matière et ses propriétés", ar: "المادة وخصائصها", duration: "40 min", level: "easy", popular: false }
    ],
    "2apic": [
      { id: "p4", fr: "Matière et environnement", ar: "المادة والمحيط", duration: "50 min", level: "medium", popular: true },
      { id: "p5", fr: "Circuit électrique", ar: "الدارة الكهربائية", duration: "55 min", level: "medium", popular: true },
      { id: "p6", fr: "Mouvements et vitesses", ar: "الحركات والسرعات", duration: "45 min", level: "medium", popular: false }
    ],
    "3apic": [
      { id: "p7", fr: "Mécanique : forces et mouvements", ar: "الميكانيك: القوى والحركات", duration: "60 min", level: "medium", popular: true },
      { id: "p8", fr: "Lumière et optique", ar: "الضوء والبصريات", duration: "55 min", level: "medium", popular: true },
      { id: "p9", fr: "Réactions chimiques", ar: "التفاعلات الكيميائية", duration: "50 min", level: "medium", popular: false }
    ],
    "tcs": [
      { id: "p10", fr: "Gravitation universelle", ar: "التجاذب الكوني", duration: "65 min", level: "hard", popular: true },
      { id: "p11", fr: "Mouvement et repos", ar: "الحركة والسكون", duration: "60 min", level: "medium", popular: true },
      { id: "p12", fr: "La chimie autour de nous", ar: "الكيمياء من حولنا", duration: "55 min", level: "medium", popular: false }
    ],
    "1bac": [
      { id: "p13", fr: "Travail et énergie", ar: "الشغل والطاقة", duration: "70 min", level: "hard", popular: true },
      { id: "p14", fr: "Électricité : condensateur et bobine", ar: "المكثف والوشيعة", duration: "75 min", level: "hard", popular: true },
      { id: "p15", fr: "Chimie des solutions", ar: "كيمياء المحاليل", duration: "60 min", level: "medium", popular: false }
    ],
    "2bac": [
      { id: "p16", fr: "Ondes mécaniques", ar: "الموجات الميكانيكية", duration: "80 min", level: "hard", popular: true },
      { id: "p17", fr: "Transformations nucléaires", ar: "التحولات النووية", duration: "75 min", level: "hard", popular: true },
      { id: "p18", fr: "Dipôle RC, RL, RLC", ar: "ثنائي القطب RC, RL, RLC", duration: "90 min", level: "hard", popular: true },
      { id: "p19", fr: "Pendule pesant - Horloge de Huygens", ar: "النواس الوازن - ساعة هوغنز", duration: "85 min", level: "hard", popular: true },
      { id: "p20", fr: "Mécanique quantique", ar: "الميكانيك الكمي", duration: "80 min", level: "hard", popular: false }
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   📝 بنك التمارين (Mock Data)
   تمارين واقعية مرتبطة بالمستوى والمادة مع حلول مفصلة
═══════════════════════════════════════════════════════════════ */
const EXERCISES_DATA = {
  math: {
    "3apic": [
      {
        id: "ex1", difficulty: "easy",
        fr: { title: "Résolution d'équation du premier degré", statement: "Résoudre l'équation :  3x + 7 = 22", steps: ["On isole le terme avec x : 3x = 22 - 7", "On simplifie : 3x = 15", "On divise par 3 : x = 15 ÷ 3 = 5", "Vérification : 3(5) + 7 = 15 + 7 = 22 ✓"], answer: "S = { 5 }" },
        ar: { title: "حل معادلة من الدرجة الأولى", statement: "حل المعادلة :  3x + 7 = 22", steps: ["نعزل الحد الذي يحتوي على x : 3x = 22 - 7", "نبسّط : 3x = 15", "نقسم على 3 : x = 15 ÷ 3 = 5", "التحقق : 3(5) + 7 = 15 + 7 = 22 ✓"], answer: "S = { 5 }" }
      },
      {
        id: "ex2", difficulty: "medium",
        fr: { title: "Théorème de Pythagore", statement: "Un triangle ABC est rectangle en A avec AB = 3 cm et AC = 4 cm. Calculer BC.", steps: ["D'après le théorème de Pythagore dans le triangle ABC rectangle en A :", "BC² = AB² + AC²", "BC² = 3² + 4² = 9 + 16 = 25", "BC = √25 = 5 cm"], answer: "BC = 5 cm" },
        ar: { title: "مبرهنة فيثاغورس", statement: "مثلث ABC قائم الزاوية في A حيث AB = 3 cm و AC = 4 cm. احسب BC.", steps: ["حسب مبرهنة فيثاغورس في المثلث ABC القائم في A :", "BC² = AB² + AC²", "BC² = 3² + 4² = 9 + 16 = 25", "BC = √25 = 5 cm"], answer: "BC = 5 cm" }
      },
      {
        id: "ex3", difficulty: "hard",
        fr: { title: "Système d'équations", statement: "Résoudre le système :\n2x + y = 7\nx - y = 2", steps: ["Méthode par addition : on additionne les deux équations", "(2x + y) + (x - y) = 7 + 2 → 3x = 9 → x = 3", "On remplace dans la 2ème : 3 - y = 2 → y = 1", "Vérification : 2(3) + 1 = 7 ✓  et  3 - 1 = 2 ✓"], answer: "S = { (3 ; 1) }" },
        ar: { title: "نظام معادلتين", statement: "حل النظام :\n2x + y = 7\nx - y = 2", steps: ["طريقة الجمع : نجمع المعادلتين", "(2x + y) + (x - y) = 7 + 2 → 3x = 9 → x = 3", "نعوض في المعادلة 2 : 3 - y = 2 → y = 1", "التحقق : 2(3) + 1 = 7 ✓  و  3 - 1 = 2 ✓"], answer: "S = { (3 ; 1) }" }
      }
    ],
    "2bac": [
      {
        id: "ex4", difficulty: "medium",
        fr: { title: "Calcul de dérivée", statement: "Calculer la dérivée de f(x) = x³ - 6x² + 9x + 2", steps: ["On applique les règles de dérivation :", "f'(x) = 3x² - 12x + 9", "On peut factoriser : f'(x) = 3(x² - 4x + 3)", "f'(x) = 3(x - 1)(x - 3)"], answer: "f'(x) = 3(x - 1)(x - 3)" },
        ar: { title: "حساب مشتقة", statement: "احسب مشتقة الدالة f(x) = x³ - 6x² + 9x + 2", steps: ["نطبق قواعد الاشتقاق :", "f'(x) = 3x² - 12x + 9", "يمكننا التفكيك : f'(x) = 3(x² - 4x + 3)", "f'(x) = 3(x - 1)(x - 3)"], answer: "f'(x) = 3(x - 1)(x - 3)" }
      },
      {
        id: "ex5", difficulty: "hard",
        fr: { title: "Calcul intégral", statement: "Calculer l'intégrale I = ∫₀¹ (3x² + 2x) dx", steps: ["On calcule la primitive F(x) = x³ + x²", "I = F(1) - F(0)", "I = (1³ + 1²) - (0³ + 0²)", "I = (1 + 1) - 0 = 2"], answer: "I = 2" },
        ar: { title: "حساب تكاملي", statement: "احسب التكامل I = ∫₀¹ (3x² + 2x) dx", steps: ["نحسب الدالة الأصلية F(x) = x³ + x²", "I = F(1) - F(0)", "I = (1³ + 1²) - (0³ + 0²)", "I = (1 + 1) - 0 = 2"], answer: "I = 2" }
      },
      {
        id: "ex6", difficulty: "hard",
        fr: { title: "Nombres complexes", statement: "Écrire sous forme algébrique : z = (2 + i)² + (1 - 3i)", steps: ["On développe (2 + i)² = 4 + 4i + i² = 4 + 4i - 1 = 3 + 4i", "On additionne : z = (3 + 4i) + (1 - 3i)", "z = (3 + 1) + (4 - 3)i", "z = 4 + i"], answer: "z = 4 + i" },
        ar: { title: "أعداد عقدية", statement: "اكتب على الشكل الجبري : z = (2 + i)² + (1 - 3i)", steps: ["ننشر (2 + i)² = 4 + 4i + i² = 4 + 4i - 1 = 3 + 4i", "نجمع : z = (3 + 4i) + (1 - 3i)", "z = (3 + 1) + (4 - 3)i", "z = 4 + i"], answer: "z = 4 + i" }
      }
    ]
  },
  physics: {
    "2bac": [
      {
        id: "ex7", difficulty: "hard",
        fr: { title: "Pendule pesant - Examen national 2013", statement: "Un pendule pesant est constitué d'une barre homogène de masse m = 200g et de longueur L = 40cm.\nDéterminer la période propre T₀ des petites oscillations.", steps: ["Le moment d'inertie d'une barre par rapport à une extrémité : J = mL²/3", "J = 0,2 × 0,4² / 3 = 0,0107 kg·m²", "La période propre : T₀ = 2π√(J / mgd) avec d = L/2", "T₀ = 2π√(mL²/3 / mg(L/2)) = 2π√(2L/3g)", "T₀ = 2π√(2 × 0,4 / (3 × 9,8)) = 2π√(0,0272)", "T₀ ≈ 1,04 s"], answer: "T₀ ≈ 1,04 s" },
        ar: { title: "النواس الوازن - الامتحان الوطني 2013", statement: "نواس وازن مكوّن من ساق متجانسة كتلتها m = 200g وطولها L = 40cm.\nحدد الدور الذاتي T₀ للتذبذبات الصغيرة.", steps: ["عزم القصور لساق بالنسبة لطرف : J = mL²/3", "J = 0,2 × 0,4² / 3 = 0,0107 kg·m²", "الدور الذاتي : T₀ = 2π√(J / mgd) حيث d = L/2", "T₀ = 2π√(mL²/3 / mg(L/2)) = 2π√(2L/3g)", "T₀ = 2π√(2 × 0,4 / (3 × 9,8)) = 2π√(0,0272)", "T₀ ≈ 1,04 s"], answer: "T₀ ≈ 1,04 s" }
      },
      {
        id: "ex8", difficulty: "medium",
        fr: { title: "Circuit RLC série", statement: "Un circuit RLC série avec R = 100Ω, L = 0,1H et C = 10μF.\nCalculer la fréquence propre f₀.", steps: ["La fréquence propre : f₀ = 1 / (2π√(LC))", "LC = 0,1 × 10×10⁻⁶ = 10⁻⁶", "√(LC) = √(10⁻⁶) = 10⁻³", "f₀ = 1 / (2π × 10⁻³) ≈ 159,2 Hz"], answer: "f₀ ≈ 159,2 Hz" },
        ar: { title: "دارة RLC على التوالي", statement: "دارة RLC على التوالي حيث R = 100Ω و L = 0,1H و C = 10μF.\nاحسب التردد الذاتي f₀.", steps: ["التردد الذاتي : f₀ = 1 / (2π√(LC))", "LC = 0,1 × 10×10⁻⁶ = 10⁻⁶", "√(LC) = √(10⁻⁶) = 10⁻³", "f₀ = 1 / (2π × 10⁻³) ≈ 159,2 Hz"], answer: "f₀ ≈ 159,2 Hz" }
      }
    ],
    "tcs": [
      {
        id: "ex9", difficulty: "easy",
        fr: { title: "Calcul de vitesse", statement: "Un mobile parcourt 150 km en 2 heures. Calculer sa vitesse moyenne.", steps: ["On applique la formule : v = d / t", "v = 150 / 2 = 75 km/h", "En m/s : v = 75 × 1000/3600 ≈ 20,8 m/s"], answer: "v = 75 km/h ≈ 20,8 m/s" },
        ar: { title: "حساب السرعة", statement: "يقطع متحرك مسافة 150 km في ساعتين. احسب سرعته المتوسطة.", steps: ["نطبق العلاقة : v = d / t", "v = 150 / 2 = 75 km/h", "بالـ m/s : v = 75 × 1000/3600 ≈ 20,8 m/s"], answer: "v = 75 km/h ≈ 20,8 m/s" }
      }
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   🎯 بنك أسئلة Quiz (أسئلة متعددة الاختيارات)
   8 أسئلة متنوعة بين الرياضيات والفيزياء
═══════════════════════════════════════════════════════════════ */
const QUIZ_QUESTIONS = {
  fr: [
    { id: 1, subject: "math", q: "Quelle est la dérivée de f(x) = x³ ?", options: ["3x", "3x²", "x²", "3x³"], correct: 1, explanation: "La règle : (xⁿ)' = nxⁿ⁻¹, donc (x³)' = 3x²" },
    { id: 2, subject: "physics", q: "L'unité de la force dans le système international est :", options: ["Le Joule", "Le Watt", "Le Newton", "Le Pascal"], correct: 2, explanation: "L'unité SI de la force est le Newton (N), d'après la 2ème loi de Newton : F = ma" },
    { id: 3, subject: "math", q: "Résoudre : 2x + 6 = 14", options: ["x = 3", "x = 4", "x = 5", "x = 10"], correct: 1, explanation: "2x = 14 - 6 = 8, donc x = 8/2 = 4" },
    { id: 4, subject: "physics", q: "La période d'un pendule simple dépend de :", options: ["La masse", "La longueur du fil", "La couleur", "Le volume"], correct: 1, explanation: "T = 2π√(L/g). La période dépend uniquement de la longueur L et de g." },
    { id: 5, subject: "math", q: "sin²(x) + cos²(x) = ?", options: ["0", "1", "2", "sin(2x)"], correct: 1, explanation: "C'est l'identité trigonométrique fondamentale : sin²(x) + cos²(x) = 1" },
    { id: 6, subject: "physics", q: "La formule de l'énergie cinétique est :", options: ["E = mgh", "E = ½mv²", "E = mc²", "E = Fd"], correct: 1, explanation: "L'énergie cinétique Ec = ½mv² avec m la masse et v la vitesse." },
    { id: 7, subject: "math", q: "Quelle est la limite de (1/x) quand x → +∞ ?", options: ["+∞", "1", "0", "-∞"], correct: 2, explanation: "lim(1/x) quand x→+∞ = 0 car le dénominateur croît indéfiniment." },
    { id: 8, subject: "physics", q: "La loi d'Ohm s'écrit :", options: ["U = RI", "P = UI", "I = U/R²", "U = I/R"], correct: 0, explanation: "La loi d'Ohm : U = R × I, avec U en Volts, R en Ohms et I en Ampères." }
  ],
  ar: [
    { id: 1, subject: "math", q: "ما هي مشتقة الدالة f(x) = x³ ؟", options: ["3x", "3x²", "x²", "3x³"], correct: 1, explanation: "القاعدة : (xⁿ)' = nxⁿ⁻¹ ، إذن (x³)' = 3x²" },
    { id: 2, subject: "physics", q: "وحدة القوة في النظام الدولي هي :", options: ["الجول", "الواط", "النيوتن", "الباسكال"], correct: 2, explanation: "وحدة القوة في SI هي النيوتن (N)، حسب قانون نيوتن الثاني : F = ma" },
    { id: 3, subject: "math", q: "حل : 2x + 6 = 14", options: ["x = 3", "x = 4", "x = 5", "x = 10"], correct: 1, explanation: "2x = 14 - 6 = 8 ، إذن x = 8/2 = 4" },
    { id: 4, subject: "physics", q: "دور النواس البسيط يعتمد على :", options: ["الكتلة", "طول الخيط", "اللون", "الحجم"], correct: 1, explanation: "T = 2π√(L/g). الدور يعتمد فقط على الطول L والجاذبية g." },
    { id: 5, subject: "math", q: "sin²(x) + cos²(x) = ؟", options: ["0", "1", "2", "sin(2x)"], correct: 1, explanation: "هذه المتطابقة المثلثية الأساسية : sin²(x) + cos²(x) = 1" },
    { id: 6, subject: "physics", q: "صيغة الطاقة الحركية هي :", options: ["E = mgh", "E = ½mv²", "E = mc²", "E = Fd"], correct: 1, explanation: "الطاقة الحركية Ec = ½mv² حيث m الكتلة و v السرعة." },
    { id: 7, subject: "math", q: "ما هي نهاية (1/x) عندما x → +∞ ؟", options: ["+∞", "1", "0", "-∞"], correct: 2, explanation: "lim(1/x) عندما x→+∞ = 0 لأن المقام يتزايد بلا حدود." },
    { id: 8, subject: "physics", q: "قانون أوم يُكتب :", options: ["U = RI", "P = UI", "I = U/R²", "U = I/R"], correct: 0, explanation: "قانون أوم : U = R × I ، حيث U بالفولط و R بالأوم و I بالأمبير." }
  ]
};

/* ═══════════════════════════════════════════════════════════════
   🎩 مكون Navbar - شريط التنقل العلوي
   متجاوب: قائمة عادية على الحاسوب، قائمة منسدلة على الجوال
═══════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const { navigate, page, user, setShowAuth } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✨ تأثير: تغيير مظهر الشريط عند التمرير لأسفل
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 📋 عناصر القائمة
  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "levels", label: t.nav.levels },
    { id: "subjects", label: t.nav.subjects },
    { id: "exams", label: t.nav.exams },
    { id: "quiz", label: t.nav.quiz }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/90 backdrop-blur-lg shadow-md border-b border-slate-200/60"
        : "bg-white/60 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* 🎨 الشعار */}
          <button onClick={() => navigate({ name: "home" })} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all">
                <Atom className="text-white" size={24} strokeWidth={2.5} />
              </div>
              {/* نقطة متحركة */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse"></span>
            </div>
            <div className="hidden sm:block text-start">
              <div className="text-sm md:text-base font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 bg-clip-text text-transparent leading-tight">
                {t.siteName}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{t.tagline}</div>
            </div>
          </button>

          {/* 📋 قائمة الحاسوب */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "quiz") {
                    navigate({ name: "quiz" });
                  } else {
                    navigate({ name: "home" });
                    setTimeout(() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:w-6 transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* 🌍 مبدل اللغة + حساب + جوال */}
          <div className="flex items-center gap-2">
            {/* مبدل اللغة */}
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-300 transition-all text-sm font-bold text-slate-700 hover:text-blue-700"
            >
              <Globe size={15} />
              <span>{lang === "fr" ? "العربية" : "Français"}</span>
            </button>

            {/* زر الحساب (تسجيل الدخول أو Dashboard) */}
            {user ? (
              <button
                onClick={() => navigate({ name: "dashboard" })}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-xs font-black">
                  {user.name[0]}
                </div>
                {user.name.split(" ")[0]}
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <LogIn size={14} />
                {lang === "fr" ? "Connexion" : "دخول"}
              </button>
            )}

            {/* زر فتح القائمة (على الجوال) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* 📱 قائمة الجوال المنسدلة */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMenuOpen(false);
                  if (item.id === "quiz") {
                    navigate({ name: "quiz" });
                  } else {
                    navigate({ name: "home" });
                    setTimeout(() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className="block w-full text-start px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🎨 قسم Hero - الواجهة الترحيبية الرئيسية
   أهم قسم في الموقع: العنوان الكبير + الأزرار + الإحصائيات
═══════════════════════════════════════════════════════════════ */
const Hero = () => {
  const { lang, t } = useLang();

  // 📊 بيانات الإحصائيات السريعة
  const stats = [
    { num: "6", label: t.hero.stats.levels, color: "from-blue-500 to-indigo-500" },
    { num: "150+", label: t.hero.stats.courses, color: "from-violet-500 to-purple-500" },
    { num: "500+", label: t.hero.stats.exercises, color: "from-emerald-500 to-teal-500" },
    { num: "2K+", label: t.hero.stats.students, color: "from-amber-500 to-orange-500" }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/40 py-16 md:py-24 lg:py-32">

      {/* 🌈 خلفيات زخرفية (blur shapes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/30 to-violet-400/30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-pink-300/20 to-rose-300/20 blur-3xl"></div>
      </div>

      {/* 🔣 رموز رياضية عائمة (decoration) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
        <div className="absolute top-20 right-[10%] text-8xl font-black text-blue-900 rotate-12">∑</div>
        <div className="absolute top-40 left-[8%] text-7xl font-black text-violet-900 -rotate-6">π</div>
        <div className="absolute bottom-32 right-[15%] text-9xl font-black text-indigo-900 rotate-45">∫</div>
        <div className="absolute bottom-20 left-[20%] text-6xl font-black text-blue-900 rotate-12">√</div>
        <div className="absolute top-1/2 right-[40%] text-5xl font-black text-violet-900">∞</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* 📝 الجانب الأيسر: النص */}
          <div className="text-center lg:text-start">

            {/* 🏷️ شارة علوية */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-200 shadow-sm mb-6">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-slate-700">{t.hero.badge}</span>
            </div>

            {/* 📢 العنوان الرئيسي */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
              <span className="block text-slate-800">{t.hero.title1}</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent py-1">
                {t.hero.title2}
              </span>
              <span className="block text-slate-800 text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
                {t.hero.title3}
              </span>
            </h1>

            {/* 💬 الوصف */}
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* 🔘 أزرار الإجراءات */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <button className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all">
                {t.hero.cta1}
                <ArrowRight size={18} className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 font-bold border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                <BookOpen size={18} />
                {t.hero.cta2}
              </button>
            </div>

            {/* 📊 الإحصائيات */}
            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto lg:mx-0">
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-start">
                  <div className={`text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.num}
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-500 font-semibold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎨 الجانب الأيمن: بطاقات توضيحية */}
          <div className="relative">

            {/* البطاقة الرئيسية */}
            <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-blue-500/10 border border-blue-100">

              {/* شريط علوي ملون */}
              <div className="h-2 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 rounded-t-3xl bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"></div>

              <div className="grid grid-cols-2 gap-4">
                {/* بطاقة الرياضيات */}
                <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all cursor-pointer">
                  <div className="text-4xl mb-2">📐</div>
                  <div className="font-black text-lg">
                    {lang === "fr" ? "Maths" : "الرياضيات"}
                  </div>
                  <div className="text-xs text-blue-100 mt-1 font-mono">f(x) = ax² + bx + c</div>
                </div>

                {/* بطاقة الفيزياء */}
                <div className="group bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all cursor-pointer mt-6">
                  <div className="text-4xl mb-2">⚛️</div>
                  <div className="font-black text-lg">
                    {lang === "fr" ? "Physique" : "الفيزياء"}
                  </div>
                  <div className="text-xs text-violet-100 mt-1 font-mono">E = mc²</div>
                </div>

                {/* بطاقة الامتحانات */}
                <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all cursor-pointer -mt-2">
                  <div className="text-4xl mb-2">🎓</div>
                  <div className="font-black text-lg">
                    {lang === "fr" ? "Bac 2024" : "باك 2024"}
                  </div>
                  <div className="text-xs text-emerald-100 mt-1">✓ {lang === "fr" ? "Corrigés" : "محلولة"}</div>
                </div>

                {/* بطاقة التمارين */}
                <div className="group 
                g-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all cursor-pointer mt-4">
                  <div className="text-4xl mb-2">✏️</div>
                  <div className="font-black text-lg">
                    {lang === "fr" ? "Exercices" : "تمارين"}
                  </div>
                  <div className="text-xs text-amber-100 mt-1">500+ {lang === "fr" ? "problèmes" : "مسألة"}</div>
                </div>
              </div>

              {/* 🏷️ شارة معدل النجاح (عائمة) */}
              <div className={`absolute -top-6 ${lang === "ar" ? "-left-4" : "-right-4"} bg-white rounded-2xl shadow-xl p-3 border border-slate-100 flex items-center gap-3`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-800">98%</div>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    {lang === "fr" ? "Taux de réussite" : "نسبة النجاح"}
                  </div>
                </div>
              </div>
            </div>

            {/* 💫 شكل دائري زخرفي خلفي */}
            <div className={`absolute -z-10 ${lang === "ar" ? "-left-10" : "-right-10"} -bottom-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300/30 to-violet-300/30 blur-2xl`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🎓 قسم المستويات الستة - المنهاج المغربي
   6 بطاقات: من 1APIC إلى 2BAC مع ألوان مميزة وتأثيرات جذابة
═══════════════════════════════════════════════════════════════ */
const LevelsSection = () => {
  const { lang, t } = useLang();
  const { navigate } = useRouter();

  // 🎨 بيانات التصميم لكل مستوى (ألوان + أيقونات)
  // هذه البيانات ثابتة (غير مترجمة) لأنها تصميمية فقط
  const levelStyles = [
    { gradient: "from-emerald-400 via-teal-400 to-cyan-500", bgGlow: "from-emerald-400/30 to-cyan-400/30", emoji: "🌱", ring: "ring-emerald-300" },
    { gradient: "from-sky-400 via-blue-400 to-indigo-500", bgGlow: "from-sky-400/30 to-indigo-400/30", emoji: "📘", ring: "ring-sky-300" },
    { gradient: "from-indigo-400 via-violet-400 to-purple-500", bgGlow: "from-indigo-400/30 to-purple-400/30", emoji: "🎯", ring: "ring-indigo-300" },
    { gradient: "from-violet-400 via-fuchsia-400 to-pink-500", bgGlow: "from-violet-400/30 to-pink-400/30", emoji: "🔬", ring: "ring-violet-300" },
    { gradient: "from-pink-400 via-rose-400 to-red-500", bgGlow: "from-pink-400/30 to-red-400/30", emoji: "⚗️", ring: "ring-pink-300" },
    { gradient: "from-amber-400 via-orange-400 to-red-500", bgGlow: "from-amber-400/30 to-orange-400/30", emoji: "🎓", ring: "ring-amber-300" }
  ];

  return (
    <section id="levels" className="relative py-20 md:py-28 bg-white overflow-hidden">

      {/* 🌈 خلفية زخرفية خفيفة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-violet-100/40 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 📌 رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          {/* الشارة */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-4">
            <GraduationCap size={14} className="text-blue-600" />
            <span className="text-xs font-bold text-blue-700">{t.levels.badge}</span>
          </div>

          {/* العنوان */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {t.levels.title}
          </h2>

          {/* الوصف */}
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {t.levels.subtitle}
          </p>

          {/* خط فاصل مزخرف */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="w-16 h-0.5 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 rounded-full"></span>
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"></span>
          </div>
        </div>

        {/* 🎴 شبكة البطاقات (6 مستويات) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {t.levels.items.map((level, i) => {
            const style = levelStyles[i];
            return (
              <button
                key={i}
                onClick={() => navigate({ name: "level", levelId: level.short.toLowerCase() })}
                className="group relative bg-white rounded-3xl p-6 md:p-7 shadow-lg hover:shadow-2xl border border-slate-100 hover:border-transparent transition-all duration-500 overflow-hidden cursor-pointer text-start w-full"
              >
                {/* 🌟 خلفية gradient تظهر عند hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* 💫 هالة ضوئية علوية */}
                <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${style.bgGlow} blur-3xl group-hover:opacity-0 transition-opacity`}></div>

                {/* 📦 المحتوى (يتغير لونه عند hover) */}
                <div className="relative z-10">

                  {/* 🏷️ الأيقونة والشارة */}
                  <div className="flex items-start justify-between mb-5">
                    {/* أيقونة emoji كبيرة */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <span className="drop-shadow-lg">{style.emoji}</span>
                      {/* تأثير لمعان */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* الاختصار (1APIC, 2BAC, ...) */}
                    <div className="text-start">
                      <div className={`text-[10px] font-bold text-slate-400 group-hover:text-white/80 uppercase tracking-wider transition-colors`}>
                        {lang === "fr" ? "Niveau" : "المستوى"}
                      </div>
                      <div className="text-sm font-black text-slate-700 group-hover:text-white transition-colors">
                        {level.short}
                      </div>
                    </div>
                  </div>

                  {/* 📝 اسم المستوى */}
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 group-hover:text-white mb-2 transition-colors">
                    {level.name}
                  </h3>

                  {/* 📄 الوصف */}
                  <p className="text-sm text-slate-600 group-hover:text-white/90 mb-5 leading-relaxed transition-colors line-clamp-2">
                    {level.desc}
                  </p>

                  {/* 📊 عدد الدروس + زر التوجيه */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-white/30 transition-colors">

                    {/* عدد الدروس */}
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-slate-400 group-hover:text-white/80 transition-colors" />
                      <span className="text-xs font-bold text-slate-500 group-hover:text-white/90 transition-colors">
                        {level.count} {t.levels.courses}
                      </span>
                    </div>

                    {/* سهم التوجيه */}
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {t.levels.cta}
                      </span>
                      <ChevronRight size={16} className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </div>

                {/* ✨ زخرفة زاوية (رقم مستوى كبير خلفي) */}
                <div className="absolute bottom-0 right-0 text-[120px] font-black text-slate-100/50 group-hover:text-white/10 leading-none pointer-events-none transition-colors">
                  {i + 1}
                </div>
              </button>
            );
          })}
        </div>

        {/* 📞 دعوة للإجراء السفلية */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="w-8 h-px bg-slate-300"></span>
            <span className="font-semibold">
              {lang === "fr"
                ? "Contenu conforme au programme officiel marocain"
                : "محتوى مطابق للمنهاج الرسمي المغربي"}
            </span>
            <span className="w-8 h-px bg-slate-300"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   📚 قسم المواد - الرياضيات والفيزياء
   بطاقتان كبيرتان جذابتان لعرض التخصصين الرئيسيين
═══════════════════════════════════════════════════════════════ */
const SubjectsSection = () => {
  const { lang, t } = useLang();

  // 🎨 بيانات تصميم البطاقتين
  const subjects = [
    {
      data: t.subjects.math,
      Icon: Calculator,
      gradient: "from-blue-600 via-indigo-600 to-violet-600",
      bgPattern: "from-blue-500/10 to-indigo-500/10",
      glowColor: "shadow-blue-500/30",
      accentColor: "text-blue-200",
      formula: "f(x) = ax² + bx + c"
    },
    {
      data: t.subjects.physics,
      Icon: FlaskConical,
      gradient: "from-violet-600 via-fuchsia-600 to-pink-600",
      bgPattern: "from-violet-500/10 to-pink-500/10",
      glowColor: "shadow-violet-500/30",
      accentColor: "text-violet-200",
      formula: "F = m × a"
    }
  ];

  return (
    <section id="subjects" className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30 overflow-hidden">

      {/* 🌈 خلفيات زخرفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-violet-200/30 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 📌 رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-4">
            <Sparkles size={14} className="text-violet-600" />
            <span className="text-xs font-bold text-violet-700">{t.subjects.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {t.subjects.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {t.subjects.subtitle}
          </p>
        </div>

        {/* 🎴 بطاقتان كبيرتان */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {subjects.map((subj, i) => (
            <div
              key={i}
              className={`group relative rounded-3xl p-8 md:p-10 bg-gradient-to-br ${subj.gradient} text-white shadow-2xl ${subj.glowColor} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer`}
            >
              {/* ✨ زخرفة خلفية: دوائر متحركة */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-2xl"></div>
                {/* صيغة رياضية كبيرة شفافة */}
                <div className="absolute bottom-4 right-6 text-7xl font-black text-white/5 font-mono select-none">
                  {subj.formula}
                </div>
              </div>

              {/* 📦 المحتوى */}
              <div className="relative z-10">

                {/* 🎨 الأيقونة الكبيرة */}
                <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <subj.Icon size={40} strokeWidth={2} className="text-white drop-shadow-lg" />
                </div>

                {/* 📝 الشعار الصغير */}
                <div className={`text-xs font-bold ${subj.accentColor} uppercase tracking-widest mb-2`}>
                  {subj.data.tagline}
                </div>

                {/* 📢 اسم المادة */}
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  {subj.data.name}
                </h3>

                {/* 📄 الوصف */}
                <p className="text-white/90 leading-relaxed mb-6 text-sm md:text-base">
                  {subj.data.desc}
                </p>

                {/* 🏷️ المواضيع (chips) */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {subj.data.topics.map((topic, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-bold hover:bg-white/30 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* 🔘 زر الإجراء */}
                <button className="group/btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
                  {t.subjects.cta}
                  <ArrowRight
                    size={16}
                    className={`${lang === "ar" ? "rotate-180" : ""} group-hover/btn:translate-x-1 transition-transform`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⭐ قسم المميزات - 6 أسباب لاختيار الموقع
   شبكة من 6 بطاقات مع أيقونات ملونة وتأثيرات أنيقة
═══════════════════════════════════════════════════════════════ */
const AdvantagesSection = () => {
  const { lang, t } = useLang();

  // 🎨 بيانات التصميم لكل ميزة (أيقونة + لون)
  const advantageStyles = [
    { Icon: BookOpen, color: "blue", bg: "bg-blue-100", text: "text-blue-600", ring: "group-hover:ring-blue-300" },
    { Icon: CheckCircle, color: "emerald", bg: "bg-emerald-100", text: "text-emerald-600", ring: "group-hover:ring-emerald-300" },
    { Icon: Target, color: "violet", bg: "bg-violet-100", text: "text-violet-600", ring: "group-hover:ring-violet-300" },
    { Icon: Download, color: "amber", bg: "bg-amber-100", text: "text-amber-600", ring: "group-hover:ring-amber-300" },
    { Icon: TrendingUp, color: "rose", bg: "bg-rose-100", text: "text-rose-600", ring: "group-hover:ring-rose-300" },
    { Icon: Smartphone, color: "cyan", bg: "bg-cyan-100", text: "text-cyan-600", ring: "group-hover:ring-cyan-300" }
  ];

  return (
    <section id="advantages" className="relative py-20 md:py-28 bg-white overflow-hidden">

      {/* 🌈 شريط زخرفي علوي */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-b-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 📌 رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
            <Zap size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">{t.advantages.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {t.advantages.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {t.advantages.subtitle}
          </p>
        </div>

        {/* 🎴 شبكة المميزات (6 بطاقات) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {t.advantages.items.map((item, i) => {
            const style = advantageStyles[i];
            return (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 md:p-7 border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* ✨ زخرفة هالة في الزاوية */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${style.bg} opacity-30 group-hover:opacity-60 group-hover:scale-150 blur-2xl transition-all duration-700`}></div>

                {/* 📦 المحتوى */}
                <div className="relative z-10">

                  {/* 🎨 الأيقونة + الرقم */}
                  <div className="flex items-start justify-between mb-5">
                    {/* أيقونة في صندوق ملون */}
                    <div className={`w-14 h-14 rounded-2xl ${style.bg} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ring-transparent ${style.ring}`}>
                      <style.Icon className={style.text} size={26} strokeWidth={2.2} />
                    </div>

                    {/* رقم الميزة */}
                    <div className={`text-3xl font-black ${style.text} opacity-20 group-hover:opacity-40 transition-opacity`}>
                      0{i + 1}
                    </div>
                  </div>

                  {/* 📝 العنوان */}
                  <h3 className="text-lg md:text-xl font-black text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                    {item.title}
                  </h3>

                  {/* 📄 الوصف */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* ✓ علامة سفلية تظهر عند hover */}
                  <div className={`mt-5 flex items-center gap-2 ${style.text} opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500`}>
                    <CheckCircle size={14} />
                    <span className="text-xs font-bold">
                      {lang === "fr" ? "Inclus dans tous les niveaux" : "متوفر في جميع المستويات"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 📊 شريط إحصائيات سفلي */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
          {/* خلفية ضوئية */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl"></div>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { Icon: Users, value: "2,500+", label: lang === "fr" ? "Élèves actifs" : "تلميذ نشط" },
              { Icon: BookOpen, value: "150+", label: lang === "fr" ? "Cours disponibles" : "درس متاح" },
              { Icon: Award, value: "98%", label: lang === "fr" ? "Taux de réussite" : "نسبة النجاح" },
              { Icon: Clock, value: "24/7", label: lang === "fr" ? "Accessibilité" : "متاح دائما" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3">
                  <stat.Icon size={22} className="text-blue-300" />
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-blue-200/70 font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   💬 قسم الشهادات (Testimonials)
   عرض تعليقات الطلاب الناجحين بطريقة جذابة
═══════════════════════════════════════════════════════════════ */
const TestimonialsSection = () => {
  const { lang, t } = useLang();

  // 🎨 ألوان الـ avatar لكل شهادة
  const avatarColors = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-pink-500 to-rose-600"
  ];

  return (
    <section id="testimonials" className="relative py-20 md:py-28 bg-gradient-to-br from-blue-950 via-indigo-950 to-violet-950 text-white overflow-hidden">

      {/* 🌈 خلفيات ضوئية ملونة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-3xl"></div>
      </div>

      {/* 🔣 رمز اقتباس كبير زخرفي */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
        <Quote size={200} strokeWidth={1} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 📌 رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">{t.testimonials.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
              {t.testimonials.title}
            </span>
          </h2>
          <p className="text-base md:text-lg text-blue-100/80 leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* 🎴 شبكة الشهادات (4 بطاقات) */}
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {t.testimonials.items.map((tm, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.07] backdrop-blur-md rounded-3xl p-6 md:p-7 border border-white/10 hover:border-white/30 hover:bg-white/[0.1] transition-all duration-500 overflow-hidden"
            >
              {/* ✨ هالة عند hover */}
              <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${avatarColors[i]} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700`}></div>

              {/* 📦 المحتوى */}
              <div className="relative z-10">

                {/* ⭐ النجوم + رمز الاقتباس */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(tm.rating)].map((_, j) => (
                      <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote size={28} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </div>

                {/* 💬 الرسالة */}
                <p className="text-blue-50/90 text-sm md:text-base leading-relaxed mb-6 italic">
                  "{tm.msg}"
                </p>

                {/* 👤 معلومات الطالب */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {/* avatar بحرف الاسم */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center font-black text-lg shadow-lg ring-2 ring-white/20`}>
                    {tm.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{tm.name}</div>
                    <div className="text-xs text-blue-200/70 mt-0.5">{tm.level}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ❓ قسم الأسئلة الشائعة (FAQ)
   accordion تفاعلي مع فتح/إغلاق سلس
═══════════════════════════════════════════════════════════════ */
const FaqSection = () => {
  const { lang, t } = useLang();
  const [openIndex, setOpenIndex] = useState(0); // أول سؤال مفتوح افتراضياً

  // 🔄 تبديل فتح/إغلاق السؤال
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30 overflow-hidden">

      {/* 🌈 خلفيات زخرفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full bg-violet-200/40 blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 📌 رأس القسم */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-4">
            <HelpCircle size={14} className="text-blue-600" />
            <span className="text-xs font-bold text-blue-700">{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {t.faq.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* 📋 قائمة الأسئلة (Accordion) */}
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-blue-300 shadow-xl shadow-blue-500/10"
                    : "border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md"
                }`}
              >
                {/* 🔘 السؤال (زر قابل للنقر) */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-start flex items-center justify-between gap-4 p-5 md:p-6 group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* رقم السؤال */}
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                      isOpen
                        ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* نص السؤال */}
                    <h3 className={`font-bold text-sm md:text-base leading-snug transition-colors ${
                      isOpen ? "text-blue-900" : "text-slate-800"
                    }`}>
                      {item.q}
                    </h3>
                  </div>

                  {/* ➕ / ➖ أيقونة الفتح/الإغلاق */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white rotate-180"
                      : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {/* 📄 الجواب (يظهر عند الفتح) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 ps-[68px] md:ps-[76px]">
                      <div className="pt-1 border-t border-slate-100">
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed pt-4">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 📞 دعوة للتواصل (إذا لم يجد إجابة) */}
        <div className="mt-10 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 md:p-8 border border-blue-200 text-center">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <Mail className="text-white" size={24} />
          </div>
          <h4 className="text-lg md:text-xl font-black text-slate-800 mb-2">
            {t.faq.contactCta}
          </h4>
          <p className="text-sm text-slate-600 mb-5">
            {lang === "fr"
              ? "Notre équipe est là pour vous aider à tout moment"
              : "فريقنا هنا لمساعدتك في أي وقت"}
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Send size={16} />
            {t.faq.contactBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🚀 قسم الدعوة للإجراء النهائي (Call-to-Action)
   آخر فرصة لإقناع الزائر بالتسجيل قبل Footer
═══════════════════════════════════════════════════════════════ */
const CtaSection = () => {
  const { lang, t } = useLang();

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">

      {/* 🌈 خلفية بألوان متدرجة فاخرة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-700"></div>

      {/* ✨ تأثيرات ضوئية متراكبة */}
      <div className="absolute inset-0 pointer-events-none">
        {/* دوائر ضوئية متحركة */}
        <div className="absolute top-0 -left-20 w-96 h-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-cyan-400/30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-500/20 blur-3xl"></div>

        {/* نقشة شبكية */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}>
        </div>

        {/* رموز رياضية عائمة */}
        <div className="absolute top-10 left-[10%] text-7xl font-black text-white/10 rotate-12">∫</div>
        <div className="absolute bottom-10 right-[10%] text-7xl font-black text-white/10 -rotate-12">√</div>
        <div className="absolute top-1/2 right-[20%] text-6xl font-black text-white/10 rotate-45">π</div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">

        {/* 🎁 شارة علوية */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 mb-6">
          <Rocket size={16} className="text-amber-300" />
          <span className="text-xs font-bold text-white">
            {lang === "fr" ? "Démarrez votre parcours aujourd'hui" : "ابدأ مسارك اليوم"}
          </span>
        </div>

        {/* 📢 العنوان الكبير */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight">
          {t.cta.title}
        </h2>

        {/* 💬 الوصف */}
        <p className="text-base md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.cta.subtitle}
        </p>

        {/* 🔘 أزرار الإجراء */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-blue-700 font-bold text-base shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all">
            <Rocket size={18} />
            {t.cta.btn1}
            <ArrowRight size={16} className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
          </button>
          <button className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/15 backdrop-blur-md text-white font-bold border-2 border-white/40 hover:bg-white/25 hover:border-white/60 transition-all">
            <Target size={18} />
            {t.cta.btn2}
          </button>
        </div>

        {/* ✓ المزايا السريعة */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-blue-100/90">
          <span>{t.cta.benefit1}</span>
          <span className="text-white/30">•</span>
          <span>{t.cta.benefit2}</span>
          <span className="text-white/30">•</span>
          <span>{t.cta.benefit3}</span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   📄 صفحة المستوى الواحد (LevelPage)
   تُعرض عند النقر على أي مستوى من الصفحة الرئيسية
   تحتوي: رأس مميز + اختيار المادة (رياضيات / فيزياء)
═══════════════════════════════════════════════════════════════ */
const LevelPage = ({ levelId }) => {
  const { lang, t } = useLang();
  const { navigate } = useRouter();

  // 🔍 البحث عن بيانات المستوى المختار
  const levelIndex = t.levels.items.findIndex(
    (lv) => lv.short.toLowerCase() === levelId
  );
  const level = t.levels.items[levelIndex];

  // 🎨 ألوان المستوى (نفس ألوان LevelsSection للتناسق)
  const levelStyles = [
    { gradient: "from-emerald-500 via-teal-500 to-cyan-600", emoji: "🌱", soft: "from-emerald-50 to-cyan-50" },
    { gradient: "from-sky-500 via-blue-500 to-indigo-600", emoji: "📘", soft: "from-sky-50 to-indigo-50" },
    { gradient: "from-indigo-500 via-violet-500 to-purple-600", emoji: "🎯", soft: "from-indigo-50 to-purple-50" },
    { gradient: "from-violet-500 via-fuchsia-500 to-pink-600", emoji: "🔬", soft: "from-violet-50 to-pink-50" },
    { gradient: "from-pink-500 via-rose-500 to-red-600", emoji: "⚗️", soft: "from-pink-50 to-red-50" },
    { gradient: "from-amber-500 via-orange-500 to-red-600", emoji: "🎓", soft: "from-amber-50 to-orange-50" }
  ];
  const style = levelStyles[levelIndex] || levelStyles[0];

  // ⚠️ إذا لم يوجد المستوى
  if (!level) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-slate-600">{lang === "fr" ? "Niveau introuvable" : "المستوى غير موجود"}</p>
        </div>
      </div>
    );
  }

  // 📊 إحصائيات المستوى (وهمية للعرض)
  const stats = [
    { Icon: BookOpen, value: level.count, label: t.levelPage.stats.chapters },
    { Icon: PenTool, value: level.count * 8, label: t.levelPage.stats.exercises },
    { Icon: FileText, value: 12, label: t.levelPage.stats.exams },
    { Icon: Users, value: "350+", label: t.levelPage.stats.students }
  ];

  return (
    <div className="min-h-screen">

      {/* ═══════ 🎨 رأس الصفحة (Hero) ═══════ */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${style.gradient} text-white py-16 md:py-24`}>

        {/* خلفيات زخرفية */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          {/* رموز رياضية عائمة */}
          <div className="absolute top-10 right-[15%] text-9xl font-black text-white/5 rotate-12">∑</div>
          <div className="absolute bottom-10 left-[10%] text-8xl font-black text-white/5 -rotate-12">π</div>
          {/* emoji كبير في الزاوية */}
          <div className="absolute top-1/2 -translate-y-1/2 right-10 text-[200px] opacity-20 select-none">
            {style.emoji}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 🔙 زر الرجوع */}
          <button
            onClick={() => navigate({ name: "home" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all text-sm font-bold mb-8"
          >
            <ChevronLeft size={16} className={lang === "ar" ? "rotate-180" : ""} />
            {t.levelPage.back}
          </button>

          {/* 📌 العنوان الرئيسي */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 mb-4">
              <span className="text-xs font-bold tracking-wider">{level.short}</span>
            </div>

            <div className="text-sm font-bold text-white/80 mb-2">
              {t.levelPage.welcome}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              {level.name}
            </h1>

            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
              {level.desc}
            </p>
          </div>

          {/* 📊 شريط الإحصائيات */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/25 transition-all"
              >
                <s.Icon size={20} className="text-white/80 mb-2" />
                <div className="text-2xl md:text-3xl font-black">{s.value}</div>
                <div className="text-xs text-white/80 font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 📚 قسم اختيار المادة ═══════ */}
      <section className={`relative py-16 md:py-20 bg-gradient-to-br ${style.soft}`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 📌 رأس القسم */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
              <Layers size={14} className="text-blue-600" />
              <span className="text-xs font-bold text-slate-700">
                {lang === "fr" ? "Étape 1 sur 3" : "الخطوة 1 من 3"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              {t.levelPage.chooseSubject}
            </h2>
            <p className="text-base text-slate-600">{t.levelPage.chooseSubjectSub}</p>
          </div>

          {/* 🎴 بطاقتا المواد */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* 🔵 بطاقة الرياضيات */}
            <button
              onClick={() => navigate({ name: "subject", levelId, subjectId: "math" })}
              className="group relative bg-white rounded-3xl p-7 md:p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-300 transition-all duration-500 overflow-hidden text-start"
            >
              {/* خلفية gradient عند hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* هالة في الزاوية */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl group-hover:bg-white/20 transition-colors"></div>

              <div className="relative z-10">
                {/* أيقونة */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-5 group-hover:bg-white/20 group-hover:scale-110 transition-all">
                  <Calculator size={32} className="text-white" />
                </div>

                {/* اسم المادة */}
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-white mb-2 transition-colors">
                  {t.levelPage.math.name}
                </h3>

                {/* الوصف */}
                <p className="text-sm text-slate-600 group-hover:text-white/90 mb-5 leading-relaxed transition-colors">
                  {t.levelPage.math.desc}
                </p>

                {/* عدد الفصول + سهم */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-white/90 transition-colors">
                    <BookOpen size={14} />
                    <span>{t.levelPage.math.chapters} {t.levelPage.stats.chapters.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">{t.levelPage.explore}</span>
                    <ChevronRight size={18} className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>
            </button>

            {/* 🟣 بطاقة الفيزياء */}
            <button
              onClick={() => navigate({ name: "subject", levelId, subjectId: "physics" })}
              className="group relative bg-white rounded-3xl p-7 md:p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-violet-300 transition-all duration-500 overflow-hidden text-start"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-violet-400/20 blur-3xl group-hover:bg-white/20 transition-colors"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg mb-5 group-hover:bg-white/20 group-hover:scale-110 transition-all">
                  <FlaskConical size={32} className="text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-800 group-hover:text-white mb-2 transition-colors">
                  {t.levelPage.physics.name}
                </h3>

                <p className="text-sm text-slate-600 group-hover:text-white/90 mb-5 leading-relaxed transition-colors">
                  {t.levelPage.physics.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-white/90 transition-colors">
                    <BookOpen size={14} />
                    <span>{t.levelPage.physics.chapters} {t.levelPage.stats.chapters.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-violet-600 group-hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">{t.levelPage.explore}</span>
                    <ChevronRight size={18} className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* 📜 ملاحظة المنهاج الرسمي */}
          <div className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl p-5 md:p-6 border border-slate-200 flex items-start gap-4 shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white" size={22} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 mb-1">{t.levelPage.programme}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{t.levelPage.programmeDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   📖 صفحة المادة (SubjectPage)
   تعرض الدروس/التمارين/الامتحانات/الملخصات بنظام تبويبات
═══════════════════════════════════════════════════════════════ */
const SubjectPage = ({ levelId, subjectId }) => {
  const { lang, t } = useLang();
  const { navigate } = useRouter();

  // 📌 حالات التحكم (بحث، تبويب، تصفية)
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // 🔍 البحث عن بيانات المستوى
  const levelIndex = t.levels.items.findIndex(
    (lv) => lv.short.toLowerCase() === levelId
  );
  const level = t.levels.items[levelIndex];

  // 📚 جلب قائمة الدروس
  const courses = COURSES_DATA[subjectId]?.[levelId] || [];

  // 🎨 ألوان المادة (أزرق للرياضيات، بنفسجي للفيزياء)
  const isMath = subjectId === "math";
  const subjectStyle = isMath
    ? {
        gradient: "from-blue-600 via-indigo-600 to-violet-700",
        soft: "from-blue-50 to-indigo-50",
        accent: "blue",
        accentHex: "#2563eb",
        Icon: Calculator,
        name: t.levelPage.math.name
      }
    : {
        gradient: "from-violet-600 via-fuchsia-600 to-pink-700",
        soft: "from-violet-50 to-pink-50",
        accent: "violet",
        accentHex: "#7c3aed",
        Icon: FlaskConical,
        name: t.levelPage.physics.name
      };

  // 🔎 تصفية الدروس (حسب البحث والصعوبة)
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = (lang === "fr" ? c.fr : c.ar)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || c.level === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  // 📑 التبويبات
  const tabs = [
    { id: "courses", label: t.subjectPage.tabs.courses, Icon: BookOpen, count: courses.length },
    { id: "exercises", label: t.subjectPage.tabs.exercises, Icon: PenTool, count: courses.length * 8 },
    { id: "exams", label: t.subjectPage.tabs.exams, Icon: FileText, count: 12 },
    { id: "summaries", label: t.subjectPage.tabs.summaries, Icon: Bookmark, count: null },
    { id: "tips", label: t.subjectPage.tabs.tips, Icon: Lightbulb, count: null }
  ];

  // 🎯 ألوان الصعوبة
  const difficultyStyles = {
    easy: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    medium: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
    hard: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" }
  };

  return (
    <div className="min-h-screen">

      {/* ═══════ 🎨 رأس صفحة المادة ═══════ */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${subjectStyle.gradient} text-white py-10 md:py-14`}>

        {/* خلفيات زخرفية */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          {/* أيقونة كبيرة في الزاوية */}
          <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-10">
            <subjectStyle.Icon size={200} strokeWidth={1.5} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 🔙 زر الرجوع */}
          <button
            onClick={() => navigate({ name: "level", levelId })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all text-sm font-bold mb-6"
          >
            <ChevronLeft size={16} className={lang === "ar" ? "rotate-180" : ""} />
            {t.subjectPage.backToLevel}
          </button>

          {/* 📌 معلومات المادة */}
          <div className="flex items-start gap-4 md:gap-6">
            {/* أيقونة المادة */}
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <subjectStyle.Icon size={36} className="text-white" />
            </div>

            {/* النص */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold text-white/80 mb-1">
                <span>{level?.short}</span>
                <span>•</span>
                <span>{level?.name}</span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight">
                {subjectStyle.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 📑 التبويبات ═══════ */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${subjectStyle.gradient} text-white shadow-lg`
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <tab.Icon size={16} />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? "bg-white/25" : "bg-slate-200 text-slate-600"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════ 📦 محتوى التبويب النشط ═══════ */}
      <section className={`relative py-10 md:py-14 bg-gradient-to-br ${subjectStyle.soft} min-h-[500px]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 📖 تبويب الدروس */}
          {activeTab === "courses" && (
            <>
              {/* شريط البحث والتصفية */}
              <div className="flex flex-col md:flex-row gap-3 mb-8">
                {/* بحث */}
                <div className="relative flex-1">
                  <Search size={18} className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-4" : "left-4"} text-slate-400`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.subjectPage.search}
                    className={`w-full ${lang === "ar" ? "pr-12 pl-4" : "pl-12 pr-4"} py-3.5 rounded-2xl bg-white border-2 border-slate-200 focus:border-${subjectStyle.accent}-500 focus:ring-4 focus:ring-${subjectStyle.accent}-100 outline-none text-sm font-medium transition-all shadow-sm`}
                  />
                </div>

                {/* تصفية الصعوبة */}
                <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 border-2 border-slate-200 shadow-sm">
                  {["all", "easy", "medium", "hard"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        difficultyFilter === diff
                          ? `bg-gradient-to-r ${subjectStyle.gradient} text-white shadow-md`
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {t.subjectPage.difficulty[diff]}
                    </button>
                  ))}
                </div>
              </div>

              {/* شبكة الدروس */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{t.subjectPage.noResults}</h3>
                  <p className="text-slate-600">{t.subjectPage.noResultsDesc}</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCourses.map((course, i) => {
                    const diffStyle = difficultyStyles[course.level];
                    return (
                      <button
                        key={course.id}
                        onClick={() => navigate({ name: "course", levelId, subjectId, courseId: course.id })}
                        className="group relative bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-2xl border-2 border-slate-100 hover:border-transparent transition-all duration-500 text-start overflow-hidden"
                      >
                        {/* شريط علوي ملون */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subjectStyle.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                        {/* شارة الشائع */}
                        {course.popular && (
                          <div className={`absolute ${lang === "ar" ? "left-4" : "right-4"} top-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black shadow-md`}>
                            <Flame size={10} />
                            {t.subjectPage.popular}
                          </div>
                        )}

                        {/* رقم الفصل + أيقونة */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${subjectStyle.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                            <span className="text-white font-black text-sm">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {t.subjectPage.chapter} {i + 1}
                            </div>
                          </div>
                        </div>

                        {/* عنوان الدرس */}
                        <h3 className="text-base md:text-lg font-black text-slate-800 mb-3 leading-snug line-clamp-2 group-hover:text-slate-900 transition-colors">
                          {lang === "fr" ? course.fr : course.ar}
                        </h3>

                        {/* شارات (صعوبة + مدة) */}
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${diffStyle.bg} ${diffStyle.text} text-xs font-bold border ${diffStyle.border}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {t.subjectPage.difficulty[course.level]}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                            <Clock size={11} />
                            {course.duration}
                          </span>
                        </div>

                        {/* زر البدء */}
                        <div className={`flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-${subjectStyle.accent}-200 transition-colors`}>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Eye size={12} />
                            <span className="font-semibold">{Math.floor(Math.random() * 500 + 100)}</span>
                          </div>
                          <div className={`flex items-center gap-1 text-sm font-black text-${subjectStyle.accent}-600 group-hover:gap-2 transition-all`}>
                            <Play size={14} className="fill-current" />
                            <span>{t.subjectPage.start}</span>
                            <ChevronRight size={14} className={lang === "ar" ? "rotate-180" : ""} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* 📝 تبويب التمارين */}
          {activeTab === "exercises" && (
            <ExercisesTab levelId={levelId} subjectId={subjectId} />
          )}

          {/* 📝 تبويبات أخرى (Placeholder) */}
          {activeTab !== "courses" && activeTab !== "exercises" && (
            <div className="bg-white rounded-3xl p-10 md:p-14 text-center border-2 border-dashed border-slate-200 max-w-2xl mx-auto">
              <div className="inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 items-center justify-center mb-5 shadow-inner">
                {activeTab === "exercises" && <PenTool size={36} className="text-slate-400" />}
                {activeTab === "exams" && <FileText size={36} className="text-slate-400" />}
                {activeTab === "summaries" && <Bookmark size={36} className="text-slate-400" />}
                {activeTab === "tips" && <Lightbulb size={36} className="text-slate-400" />}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
                {t.subjectPage.tabs[activeTab]}
              </h3>
              <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto">
                {t.subjectPage.comingSoon[activeTab]}
              </p>
              <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${subjectStyle.gradient} text-white text-xs font-bold shadow-lg`}>
                <Clock size={12} />
                {lang === "fr" ? "Bientôt disponible" : "قريباً متاح"}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   📝 مكون التمارين التفاعلي (ExercisesTab)
   يعرض التمارين مع accordion للتصحيح التفصيلي خطوة بخطوة
═══════════════════════════════════════════════════════════════ */
const ExercisesTab = ({ levelId, subjectId }) => {
  const { lang, t } = useLang();
  const [expandedId, setExpandedId] = useState(null);
  const [diffFilter, setDiffFilter] = useState("all");

  // 📚 جلب التمارين حسب المستوى والمادة
  const exercises = EXERCISES_DATA[subjectId]?.[levelId] || [];

  // 🔎 تصفية حسب الصعوبة
  const filtered = diffFilter === "all"
    ? exercises
    : exercises.filter((ex) => ex.difficulty === diffFilter);

  // 🎨 ألوان الصعوبة
  const diffColors = {
    easy: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300", dot: "bg-emerald-500", glow: "shadow-emerald-500/20" },
    medium: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", dot: "bg-amber-500", glow: "shadow-amber-500/20" },
    hard: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-300", dot: "bg-rose-500", glow: "shadow-rose-500/20" }
  };

  // 🎨 ألوان المادة
  const isMath = subjectId === "math";
  const gradient = isMath ? "from-blue-600 to-indigo-600" : "from-violet-600 to-purple-600";

  // 📭 إذا لم توجد تمارين لهذا المستوى
  if (exercises.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 md:p-14 text-center border-2 border-dashed border-slate-200 max-w-2xl mx-auto">
        <div className="inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 items-center justify-center mb-5 shadow-inner">
          <PenTool size={36} className="text-slate-400" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
          {t.subjectPage.tabs.exercises}
        </h3>
        <p className="text-sm md:text-base text-slate-600">
          {t.subjectPage.comingSoon.exercises}
        </p>
        <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-bold shadow-lg`}>
          <Clock size={12} />
          {lang === "fr" ? "Bientôt disponible" : "قريباً متاح"}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 🎚️ أزرار تصفية الصعوبة */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "easy", "medium", "hard"].map((diff) => (
          <button
            key={diff}
            onClick={() => setDiffFilter(diff)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              diffFilter === diff
                ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 shadow-sm"
            }`}
          >
            {diff !== "all" && (
              <span className={`inline-block w-2 h-2 rounded-full ${diffColors[diff]?.dot || ""} me-1.5`}></span>
            )}
            {t.subjectPage.difficulty[diff]}
            {diff !== "all" && (
              <span className="ms-1.5 opacity-70">
                ({exercises.filter((ex) => ex.difficulty === diff).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 📝 قائمة التمارين */}
      <div className="space-y-4">
        {filtered.map((ex, i) => {
          const isOpen = expandedId === ex.id;
          const data = ex[lang];
          const dc = diffColors[ex.difficulty];

          return (
            <div
              key={ex.id}
              className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                isOpen
                  ? `border-${isMath ? "blue" : "violet"}-300 shadow-xl ${isMath ? "shadow-blue-500/10" : "shadow-violet-500/10"}`
                  : "border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* ─── 📋 رأس التمرين ─── */}
              <div className="p-5 md:p-6">

                {/* شارات */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {/* رقم التمرين */}
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r ${gradient} text-white text-xs font-black shadow-sm`}>
                    <PenTool size={11} />
                    {lang === "fr" ? "Exercice" : "تمرين"} {i + 1}
                  </div>
                  {/* الصعوبة */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${dc.bg} ${dc.text} text-xs font-bold border ${dc.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dc.dot}`}></span>
                    {t.subjectPage.difficulty[ex.difficulty]}
                  </span>
                </div>

                {/* عنوان التمرين */}
                <h3 className="text-lg md:text-xl font-black text-slate-800 mb-3">
                  {data.title}
                </h3>

                {/* نص التمرين */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-4 md:p-5 border border-slate-200 mb-4">
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                    {data.statement}
                  </p>
                </div>

                {/* 🔘 زر عرض/إخفاء التصحيح */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : ex.id)}
                  className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isOpen
                      ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                      : `bg-white text-${isMath ? "blue" : "violet"}-700 border-2 border-${isMath ? "blue" : "violet"}-200 hover:bg-${isMath ? "blue" : "violet"}-50`
                  }`}
                >
                  {isOpen ? (
                    <>
                      <Eye size={15} />
                      {lang === "fr" ? "Masquer la correction" : "إخفاء التصحيح"}
                      <Minus size={14} />
                    </>
                  ) : (
                    <>
                      <CheckCircle size={15} />
                      {lang === "fr" ? "Voir la correction" : "عرض التصحيح"}
                      <Plus size={14} />
                    </>
                  )}
                </button>
              </div>

              {/* ─── 📖 التصحيح التفصيلي (Accordion) ─── */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className={`mx-5 md:mx-6 mb-5 md:mb-6 bg-gradient-to-br ${
                    isMath ? "from-blue-50 via-white to-indigo-50" : "from-violet-50 via-white to-pink-50"
                  } rounded-2xl p-5 md:p-6 border ${
                    isMath ? "border-blue-200" : "border-violet-200"
                  }`}>

                    {/* عنوان التصحيح */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}>
                        <CheckCircle size={18} className="text-white" />
                      </div>
                      <h4 className="text-base md:text-lg font-black text-slate-800">
                        {lang === "fr" ? "Correction détaillée" : "التصحيح المفصل"}
                      </h4>
                    </div>

                    {/* ─── خطوات الحل ─── */}
                    <div className="space-y-3 mb-5">
                      {data.steps.map((step, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-3 bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm"
                        >
                          {/* رقم الخطوة */}
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm text-white text-xs font-black`}>
                            {j + 1}
                          </div>
                          {/* نص الخطوة */}
                          <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium pt-0.5">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* ─── النتيجة النهائية ─── */}
                    <div className={`bg-gradient-to-r ${gradient} rounded-xl p-4 text-center shadow-lg`}>
                      <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                        {lang === "fr" ? "Résultat final" : "النتيجة النهائية"}
                      </div>
                      <div className="text-xl md:text-2xl font-black text-white font-mono">
                        {data.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📌 ملاحظة سفلية */}
      {filtered.length > 0 && (
        <div className="mt-8 text-center text-sm text-slate-500 font-semibold">
          {lang === "fr"
            ? `${filtered.length} exercice(s) disponible(s) • Plus d'exercices bientôt`
            : `${filtered.length} تمرين(ات) متاحة • المزيد قريباً`}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   📖 صفحة الدرس الكاملة (CoursePage)
   تحتوي: مقدمة + الدرس + أمثلة + ملخص + أزرار + دروس مقترحة
═══════════════════════════════════════════════════════════════ */
const CoursePage = ({ levelId, subjectId, courseId }) => {
  const { lang, t } = useLang();
  const { navigate } = useRouter();
  const [activeSection, setActiveSection] = useState("intro");
  const [bookmarked, setBookmarked] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  // 🔍 البحث عن بيانات الدرس
  const allCourses = COURSES_DATA[subjectId]?.[levelId] || [];
  const courseIndex = allCourses.findIndex((c) => c.id === courseId);
  const course = allCourses[courseIndex];

  // 📚 دروس مقترحة (التي قبل والتي بعد + دروس شائعة)
  const prevCourse = allCourses[courseIndex - 1];
  const nextCourse = allCourses[courseIndex + 1];
  const relatedCourses = allCourses
    .filter((c) => c.id !== courseId && c.popular)
    .slice(0, 3);

  // 🔍 بيانات المستوى
  const level = t.levels.items.find((lv) => lv.short.toLowerCase() === levelId);

  // 🎨 ألوان المادة
  const isMath = subjectId === "math";
  const style = isMath
    ? {
        gradient: "from-blue-600 via-indigo-600 to-violet-700",
        soft: "from-blue-50 to-indigo-50",
        accent: "blue",
        accentText: "text-blue-600",
        accentBg: "bg-blue-100",
        accentBorder: "border-blue-200",
        Icon: Calculator,
        formula: "f(x) = ax² + bx + c",
        name: t.levelPage.math.name
      }
    : {
        gradient: "from-violet-600 via-fuchsia-600 to-pink-700",
        soft: "from-violet-50 to-pink-50",
        accent: "violet",
        accentText: "text-violet-600",
        accentBg: "bg-violet-100",
        accentBorder: "border-violet-200",
        Icon: FlaskConical,
        formula: "E = mc²",
        name: t.levelPage.physics.name
      };

  // 🎯 ألوان الصعوبة
  const difficultyStyles = {
    easy: { bg: "bg-emerald-500/20", text: "text-emerald-100" },
    medium: { bg: "bg-amber-500/20", text: "text-amber-100" },
    hard: { bg: "bg-rose-500/20", text: "text-rose-100" }
  };

  // ⚠️ إذا لم يوجد الدرس
  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-slate-600">
            {lang === "fr" ? "Cours introuvable" : "الدرس غير موجود"}
          </p>
        </div>
      </div>
    );
  }

  // 📋 أقسام الدرس (للفهرس الجانبي)
  const sections = [
    { id: "intro", label: t.coursePage.sections.intro, Icon: Info },
    { id: "lesson", label: t.coursePage.sections.lesson, Icon: BookOpen },
    { id: "examples", label: t.coursePage.sections.examples, Icon: Sparkles },
    { id: "summary", label: t.coursePage.sections.summary, Icon: BookMarked }
  ];

  const diffStyle = difficultyStyles[course.level];

  return (
    <div className="min-h-screen">

      {/* ═══════ 🎨 رأس الدرس ═══════ */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${style.gradient} text-white py-10 md:py-14`}>

        {/* خلفيات زخرفية */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          {/* صيغة رياضية كبيرة خلفية */}
          <div className="absolute bottom-0 right-10 text-[140px] font-black text-white/5 font-mono select-none leading-none">
            {style.formula}
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 🔙 زر الرجوع + مسار التنقل (Breadcrumb) */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-semibold text-white/80">
            <button
              onClick={() => navigate({ name: "home" })}
              className="hover:text-white transition-colors"
            >
              {t.nav.home}
            </button>
            <ChevronRight size={12} className={lang === "ar" ? "rotate-180" : ""} />
            <button
              onClick={() => navigate({ name: "level", levelId })}
              className="hover:text-white transition-colors"
            >
              {level?.short}
            </button>
            <ChevronRight size={12} className={lang === "ar" ? "rotate-180" : ""} />
            <button
              onClick={() => navigate({ name: "subject", levelId, subjectId })}
              className="hover:text-white transition-colors"
            >
              {style.name}
            </button>
            <ChevronRight size={12} className={lang === "ar" ? "rotate-180" : ""} />
            <span className="text-white">
              {t.coursePage.meta.chapter} {courseIndex + 1}
            </span>
          </div>

          {/* 📌 معلومات الدرس */}
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">

            {/* رقم الفصل */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <span className="text-3xl md:text-4xl font-black">
                {String(courseIndex + 1).padStart(2, "0")}
              </span>
            </div>

            {/* النص */}
            <div className="flex-1">
              {/* شارة الشائع */}
              {course.popular && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black shadow-md mb-3">
                  <Flame size={10} />
                  {t.subjectPage.popular}
                </div>
              )}

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                {lang === "fr" ? course.fr : course.ar}
              </h1>

              {/* شارات المعلومات */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-bold">
                  <Clock size={12} />
                  {course.duration}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${diffStyle.bg} backdrop-blur-sm text-xs font-bold ${diffStyle.text}`}>
                  <Target size={12} />
                  {t.subjectPage.difficulty[course.level]}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-bold">
                  <Eye size={12} />
                  {Math.floor(Math.random() * 800 + 200)} {t.coursePage.meta.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 📦 محتوى الدرس + الشريط الجانبي ═══════ */}
      <section className={`relative py-10 md:py-14 bg-gradient-to-br ${style.soft} min-h-[600px]`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8">

            {/* ─── 📖 المحتوى الرئيسي ─── */}
            <article className="space-y-6">

              {/* 📌 القسم 1: المقدمة */}
              <div id="intro" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg`}>
                    <Info className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Section 1" : "القسم 1"}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                      {t.coursePage.sections.intro}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                  {t.coursePage.introText}
                </p>
              </div>

              {/* 📌 القسم 2: الدرس الكامل */}
              <div id="lesson" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg`}>
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Section 2" : "القسم 2"}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                      {t.coursePage.sections.lesson}
                    </h2>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed text-sm md:text-base mb-5">
                  {t.coursePage.lessonIntro}
                </p>

                {/* صندوق التعريف */}
                <div className={`relative bg-gradient-to-br from-white to-${style.accent}-50 rounded-2xl p-5 md:p-6 border-s-4 border-${style.accent}-500 mb-5 shadow-sm`}>
                  <div className={`absolute top-4 ${lang === "ar" ? "left-4" : "right-4"} px-2.5 py-1 rounded-full ${style.accentBg} ${style.accentText} text-[10px] font-black uppercase tracking-wider`}>
                    {t.coursePage.definitionLabel}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base pe-20">
                    {t.coursePage.definitionText}
                  </p>
                  {/* صيغة رياضية */}
                  <div className="mt-4 bg-slate-900 rounded-xl p-4 text-center font-mono text-white text-base md:text-lg shadow-inner">
                    <span className="text-emerald-400">{style.formula}</span>
                  </div>
                </div>

                {/* صندوق الخاصية */}
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-5 md:p-6 border-s-4 border-emerald-500 shadow-sm">
                  <div className={`absolute top-4 ${lang === "ar" ? "left-4" : "right-4"} px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider`}>
                    ★ {t.coursePage.propertyLabel}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base pe-24">
                    {t.coursePage.propertyText}
                  </p>
                </div>
              </div>

              {/* 📌 القسم 3: الأمثلة */}
              <div id="examples" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "Section 3" : "القسم 3"}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                      {t.coursePage.sections.examples}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {t.coursePage.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="group bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        {/* رقم المثال */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md text-white font-black text-sm group-hover:scale-110 transition-transform">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              {t.coursePage.exampleLabel} {i + 1}
                            </span>
                          </div>
                          <h3 className="font-black text-slate-800 mb-1.5 text-sm md:text-base">
                            {ex.title}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                            {ex.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 📌 القسم 4: الملخص */}
              <div id="summary" className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 md:p-8 shadow-sm border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <BookMarked className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      {lang === "fr" ? "Récapitulatif" : "تلخيص"}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900">
                      {t.coursePage.sections.summary}
                    </h2>
                  </div>
                </div>

                <ul className="space-y-3">
                  {t.coursePage.summaryPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-amber-100">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md mt-0.5">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <span className="text-sm md:text-base text-slate-700 font-medium">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🎯 دعوة للخطوة التالية (التمارين) */}
              <div className={`relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br ${style.gradient} text-white shadow-2xl`}>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
                </div>
                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <PenTool className="text-white" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black mb-1">
                      {t.coursePage.nextStep}
                    </h3>
                    <p className="text-sm text-white/90">
                      {t.coursePage.nextStepDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate({ name: "subject", levelId, subjectId })}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-800 font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap"
                  >
                    {t.coursePage.actions.exercises}
                    <ArrowRight
                      size={16}
                      className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`}
                    />
                  </button>
                </div>
              </div>
            </article>

            {/* ─── 📋 الشريط الجانبي (Sidebar) ─── */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-4">

              {/* فهرس المحتويات */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <List size={16} className={style.accentText} />
                  <h3 className="text-sm font-black text-slate-800">
                    {t.coursePage.tableOfContents}
                  </h3>
                </div>
                <nav className="space-y-1">
                  {sections.map((section, i) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        activeSection === section.id
                          ? `${style.accentBg} ${style.accentText}`
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                        activeSection === section.id
                          ? `bg-gradient-to-br ${style.gradient} text-white shadow-sm`
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {i + 1}
                      </span>
                      <span className="flex-1">{section.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* أزرار الإجراءات */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-2">
                {/* تحميل PDF + عارض */}
<button
  onClick={() => setShowPDF(!showPDF)}
  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${style.gradient} text-white text-sm font-bold shadow-md hover:shadow-xl transition-all`}
>
  <Download size={16} />
  {showPDF ? (lang === 'ar' ? 'إخفاء PDF' : 'Masquer PDF') : t.coursePage.actions.download}
</button>

{showPDF && (
  <div className="mt-3">
    <PDFViewer
      fileUrl={`/pdfs/${subjectId}/${courseId}.pdf`}
      title={lang === 'ar' ? course?.ar : course?.fr}
    />
  </div>
)}

{/* عارض PDF */}
{showPDF && (
  <div className="mt-3">
    <PDFViewer
      fileUrl="/pdfs/cours.pdf"
      title={courseId}
    />
  </div>
)}

                {/* مفضلة */}
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    bookmarked
                      ? "bg-rose-50 text-rose-600 border-2 border-rose-200"
                      : "bg-slate-50 text-slate-600 border-2 border-slate-200 hover:border-rose-200 hover:text-rose-600"
                  }`}
                >
                  <Heart size={14} className={bookmarked ? "fill-current" : ""} />
                  {t.coursePage.actions.bookmark}
                </button>

                {/* صف الأزرار الصغيرة */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all border border-slate-200">
                    <Share2 size={12} />
                    {t.coursePage.actions.share}
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-all border border-slate-200">
                    <Printer size={12} />
                    {t.coursePage.actions.print}
                  </button>
                </div>
              </div>

              {/* التنقل بين الدروس (السابق/التالي) */}
              {(prevCourse || nextCourse) && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-2">
                  {prevCourse && (
                    <button
                      onClick={() => navigate({ name: "course", levelId, subjectId, courseId: prevCourse.id })}
                      className="w-full text-start p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all group"
                    >
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase mb-1">
                        <ChevronLeft size={10} className={lang === "ar" ? "rotate-180" : ""} />
                        {lang === "fr" ? "Précédent" : "السابق"}
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-slate-900">
                        {lang === "fr" ? prevCourse.fr : prevCourse.ar}
                      </div>
                    </button>
                  )}
                  {nextCourse && (
                    <button
                      onClick={() => navigate({ name: "course", levelId, subjectId, courseId: nextCourse.id })}
                      className={`w-full text-start p-3 rounded-xl bg-gradient-to-br ${style.gradient} text-white transition-all group hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-white/80 uppercase mb-1">
                        {lang === "fr" ? "Suivant" : "التالي"}
                        <ChevronRight size={10} className={lang === "ar" ? "rotate-180" : ""} />
                      </div>
                      <div className="text-xs font-bold line-clamp-1">
                        {lang === "fr" ? nextCourse.fr : nextCourse.ar}
                      </div>
                    </button>
                  )}
                </div>
              )}
            </aside>
          </div>

          {/* ═══ 📚 دروس مقترحة ═══ */}
          {relatedCourses.length > 0 && (
            <div className="mt-14">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                  {t.coursePage.relatedCourses}
                </h2>
                <p className="text-sm text-slate-600">
                  {t.coursePage.relatedCoursesSub}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedCourses.map((rc) => (
                  <button
                    key={rc.id}
                    onClick={() => navigate({ name: "course", levelId, subjectId, courseId: rc.id })}
                    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-slate-100 transition-all text-start"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <BookOpen size={18} className="text-white" />
                      </div>
                      <Flame size={14} className="text-orange-500" />
                    </div>
                    <h3 className="font-black text-slate-800 text-sm mb-2 line-clamp-2 group-hover:text-slate-900">
                      {lang === "fr" ? rc.fr : rc.ar}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500 font-semibold">{rc.duration}</span>
                      <ArrowUpRight size={14} className={`${style.accentText} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🎯 صفحة Quiz التفاعلي الكاملة (QuizPage)
   3 حالات: شاشة البداية → الأسئلة → النتيجة
═══════════════════════════════════════════════════════════════ */
const QuizPage = () => {
  const { lang, t } = useLang();
  const { navigate } = useRouter();

  // 📌 حالات اللعبة
  const [phase, setPhase] = useState("start"); // start | playing | result
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);

  // 📚 الأسئلة حسب اللغة
  const questions = QUIZ_QUESTIONS[lang];
  const totalQ = questions.length;

  // ⏱️ المؤقت
  useEffect(() => {
    if (phase !== "playing" || showFeedback) return;
    if (timeLeft <= 0) {
      handleSubmitAnswer();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, showFeedback]);

  // 🎬 بدء اللعبة
  const startQuiz = () => {
    setPhase("playing");
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(30);
    setShowFeedback(false);
  };

  // 📤 تقديم الإجابة
  const handleSubmitAnswer = () => {
    const answer = selected !== null ? selected : -1;
    setShowFeedback(true);

    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      if (current + 1 >= totalQ) {
        setPhase("result");
      } else {
        setCurrent(current + 1);
        setSelected(null);
        setTimeLeft(30);
        setShowFeedback(false);
      }
    }, 1800);
  };

  // 🔁 إعادة اللعبة
  const restartQuiz = () => {
    setPhase("start");
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(30);
    setShowFeedback(false);
  };

  // 📊 حساب النتيجة
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percentage = Math.round((score / totalQ) * 100);

  // ═══════ 🎬 شاشة البداية ═══════
  if (phase === "start") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full text-center">
          {/* أيقونة كبيرة */}
          <div className="relative inline-flex mb-6">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/40">
              <Target className="text-white" size={56} />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg text-white text-xs font-black">
              {totalQ}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            {lang === "fr" ? "Quiz Interactif" : "اختبار تفاعلي"}
          </h1>
          <p className="text-slate-600 mb-2">
            {lang === "fr"
              ? "Testez vos connaissances en maths et physique"
              : "اختبر معلوماتك في الرياضيات والفيزياء"}
          </p>
          <p className="text-sm text-slate-500 mb-8">
            {totalQ} {lang === "fr" ? "questions" : "سؤال"} • 30s {lang === "fr" ? "par question" : "لكل سؤال"} • {lang === "fr" ? "~4 minutes" : "~4 دقائق"}
          </p>

          {/* معلومات المواد */}
          <div className="flex gap-3 justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200">
              <Calculator size={16} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-700">{lang === "fr" ? "Maths" : "رياضيات"}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 border border-violet-200">
              <FlaskConical size={16} className="text-violet-600" />
              <span className="text-sm font-bold text-violet-700">{lang === "fr" ? "Physique" : "فيزياء"}</span>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Play size={22} className="fill-current" />
            {lang === "fr" ? "Commencer le quiz" : "ابدأ الاختبار"}
            <ArrowRight size={18} className={`${lang === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
          </button>
        </div>
      </div>
    );
  }

  // ═══════ 🎯 شاشة الأسئلة ═══════
  if (phase === "playing") {
    const q = questions[current];
    const progress = ((current + 1) / totalQ) * 100;
    const isCorrect = selected === q.correct;
    const isMathQ = q.subject === "math";

    return (
      <div className="min-h-[80vh] py-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* 📊 شريط التقدم + المؤقت */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm font-bold text-slate-600 mb-2">
              <span>{lang === "fr" ? "Question" : "سؤال"} {current + 1} / {totalQ}</span>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                timeLeft <= 10 ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"
              }`}>
                <Clock size={13} />
                <span className={timeLeft <= 10 ? "animate-pulse" : ""}>{timeLeft}s</span>
              </div>
            </div>
            {/* شريط التقدم */}
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* مؤقت بصري */}
            <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 rounded-full ${
                  timeLeft <= 10 ? "bg-rose-400" : "bg-emerald-400"
                }`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* 🎴 بطاقة السؤال */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

            {/* شريط علوي ملون (حسب المادة) */}
            <div className={`h-1.5 bg-gradient-to-r ${
              isMathQ ? "from-blue-500 to-indigo-500" : "from-violet-500 to-purple-500"
            }`}></div>

            <div className="p-6 md:p-8">

              {/* شارة المادة */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                  isMathQ
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-violet-100 text-violet-700 border border-violet-200"
                }`}>
                  {isMathQ ? <Calculator size={11} /> : <FlaskConical size={11} />}
                  {isMathQ ? (lang === "fr" ? "Maths" : "رياضيات") : (lang === "fr" ? "Physique" : "فيزياء")}
                </span>
              </div>

              {/* نص السؤال */}
              <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 leading-snug">
                {q.q}
              </h2>

              {/* الخيارات */}
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  let optStyle = "";

                  if (showFeedback) {
                    if (i === q.correct) {
                      optStyle = "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-300";
                    } else if (i === selected && i !== q.correct) {
                      optStyle = "border-rose-400 bg-rose-50 ring-2 ring-rose-300";
                    } else {
                      optStyle = "border-slate-200 opacity-50";
                    }
                  } else if (selected === i) {
                    optStyle = "border-blue-500 bg-blue-50 ring-2 ring-blue-300";
                  } else {
                    optStyle = "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !showFeedback && setSelected(i)}
                      disabled={showFeedback}
                      className={`w-full text-start p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${optStyle}`}
                    >
                      {/* حرف الخيار */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                        showFeedback && i === q.correct
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md"
                          : showFeedback && i === selected && i !== q.correct
                          ? "bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-md"
                          : selected === i
                          ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {showFeedback && i === q.correct ? <CheckCircle size={18} /> :
                         showFeedback && i === selected && i !== q.correct ? <X size={18} /> :
                         letter}
                      </div>

                      <span className="text-sm md:text-base font-semibold text-slate-700">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 📝 شرح بعد الإجابة */}
              {showFeedback && (
                <div className={`mt-5 p-4 rounded-xl border ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-rose-50 border-rose-200"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? (
                      <CheckCircle size={16} className="text-emerald-600" />
                    ) : (
                      <X size={16} className="text-rose-600" />
                    )}
                    <span className={`text-sm font-black ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                      {isCorrect
                        ? (lang === "fr" ? "Bonne réponse !" : "إجابة صحيحة!")
                        : (lang === "fr" ? "Mauvaise réponse" : "إجابة خاطئة")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{q.explanation}</p>
                </div>
              )}

              {/* 🔘 زر التأكيد */}
              {!showFeedback && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selected === null}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                      selected !== null
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {current + 1 === totalQ
                      ? (lang === "fr" ? "Terminer" : "إنهاء")
                      : (lang === "fr" ? "Confirmer" : "تأكيد")}
                    <ArrowRight size={16} className={lang === "ar" ? "rotate-180" : ""} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════ 🏆 شاشة النتيجة ═══════
  const grade = percentage >= 80 ? "excellent" : percentage >= 50 ? "good" : "poor";
  const gradeData = {
    excellent: {
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      emoji: "🏆",
      fr: "Excellent ! Vous maîtrisez le sujet.",
      ar: "ممتاز! أنت تتقن الموضوع."
    },
    good: {
      gradient: "from-blue-500 via-indigo-500 to-violet-500",
      emoji: "👏",
      fr: "Bon travail ! Continuez à progresser.",
      ar: "عمل جيد! واصل التقدم."
    },
    poor: {
      gradient: "from-amber-500 via-orange-500 to-red-500",
      emoji: "💪",
      fr: "Courage ! Révisez et réessayez.",
      ar: "شجاعة! راجع وأعد المحاولة."
    }
  };
  const gd = gradeData[grade];

  return (
    <div className="min-h-[80vh] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* 🏆 رأس النتيجة */}
        <div className={`relative bg-gradient-to-br ${gd.gradient} rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl overflow-hidden mb-6`}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          </div>
          <div className="relative">
            <div className="text-6xl mb-4">{gd.emoji}</div>
            <div className="text-7xl md:text-8xl font-black mb-2">{percentage}%</div>
            <div className="text-xl md:text-2xl font-bold opacity-90 mb-2">{score} / {totalQ}</div>
            <p className="text-white/90">{lang === "fr" ? gd.fr : gd.ar}</p>
          </div>
        </div>

        {/* 📋 تفاصيل الإجابات */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-800">
              {lang === "fr" ? "Détail des réponses" : "تفاصيل الإجابات"}
            </h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correct;
              return (
                <div key={i} className={`p-4 ${isCorrect ? "bg-emerald-50/40" : "bg-rose-50/40"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                      isCorrect
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                        : "bg-gradient-to-br from-rose-500 to-red-500"
                    } text-white shadow-sm`}>
                      {isCorrect ? <CheckCircle size={14} /> : <X size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 mb-1">{q.q}</p>
                      <p className="text-xs text-slate-500">
                        {lang === "fr" ? "Bonne réponse" : "الإجابة الصحيحة"}: <span className="font-bold text-emerald-700">{q.options[q.correct]}</span>
                        {!isCorrect && answers[i] >= 0 && (
                          <span> — {lang === "fr" ? "Votre réponse" : "إجابتك"}: <span className="font-bold text-rose-600">{q.options[answers[i]]}</span></span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🔘 أزرار الإجراء */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Target size={16} />
            {lang === "fr" ? "Recommencer" : "إعادة الاختبار"}
          </button>
          <button
            onClick={() => navigate({ name: "home" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-bold border-2 border-slate-200 hover:border-blue-300 transition-all"
          >
            <Home size={16} />
            {lang === "fr" ? "Accueil" : "الرئيسية"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🔐 نافذة تسجيل الدخول / إنشاء حساب (AuthModal)
═══════════════════════════════════════════════════════════════ */
const AuthModal = ({ onClose, onLogin }) => {
  const { lang, t } = useLang();
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = () => {
    const userName = form.name || form.email?.split("@")[0] || (lang === "fr" ? "Élève" : "تلميذ");
    onLogin({ name: userName, email: form.email || "eleve@academy.ma" });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">

        {/* رأس ملون */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl"></div>
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <UserCircle size={28} />
            </div>
            <h2 className="text-2xl font-black">
              {mode === "login"
                ? (lang === "fr" ? "Connexion" : "تسجيل الدخول")
                : (lang === "fr" ? "Créer un compte" : "إنشاء حساب")}
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              {lang === "fr" ? "Math & Physique Academy" : "أكاديمية الرياضيات والفيزياء"}
            </p>
          </div>
        </div>

        {/* النموذج */}
        <div className="p-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                {lang === "fr" ? "Nom complet" : "الاسم الكامل"}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={lang === "fr" ? "Ahmed Bouazza" : "أحمد بوعزة"}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              {lang === "fr" ? "Adresse email" : "البريد الإلكتروني"}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="eleve@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              {lang === "fr" ? "Mot de passe" : "كلمة المرور"}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm"
            />
          </div>

          {/* زر الدخول */}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            {mode === "login"
              ? (lang === "fr" ? "Se connecter" : "دخول")
              : (lang === "fr" ? "Créer le compte" : "إنشاء الحساب")}
          </button>

          {/* رابط التبديل */}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {mode === "login"
              ? (lang === "fr" ? "Pas de compte ? Créer un compte" : "ليس لديك حساب؟ أنشئ حساباً")
              : (lang === "fr" ? "Déjà inscrit ? Se connecter" : "لديك حساب؟ سجل الدخول")}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   👤 لوحة تحكم الطالب (DashboardPage)
   إحصائيات + تقدم + مفضلات + نتائج Quiz
═══════════════════════════════════════════════════════════════ */
const DashboardPage = ({ user, setUser }) => {
  const { lang, t } = useLang();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // ⚠️ إذا لم يكن مسجلاً
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center mb-6 shadow-inner">
            <UserCircle size={48} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            {lang === "fr" ? "Connexion requise" : "يجب تسجيل الدخول"}
          </h2>
          <p className="text-slate-600 mb-6">
            {lang === "fr"
              ? "Connectez-vous pour accéder à votre espace personnel"
              : "سجل الدخول للوصول إلى فضائك الشخصي"}
          </p>
          <button
            onClick={() => navigate({ name: "home" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg"
          >
            <Home size={16} />
            {lang === "fr" ? "Retour à l'accueil" : "العودة للرئيسية"}
          </button>
        </div>
      </div>
    );
  }

  // 📊 بيانات وهمية للإحصائيات
  const stats = [
    { Icon: BookOpen, value: "12", label: lang === "fr" ? "Cours suivis" : "دروس متابعة", color: "blue", bg: "bg-blue-100", text: "text-blue-600" },
    { Icon: TrendingUp, value: "78%", label: lang === "fr" ? "Progression" : "التقدم", color: "emerald", bg: "bg-emerald-100", text: "text-emerald-600" },
    { Icon: Trophy, value: "5", label: lang === "fr" ? "Quiz réussis" : "اختبارات ناجحة", color: "violet", bg: "bg-violet-100", text: "text-violet-600" },
    { Icon: Heart, value: "8", label: lang === "fr" ? "Favoris" : "مفضلات", color: "rose", bg: "bg-rose-100", text: "text-rose-600" }
  ];

  // 📚 أنشطة حديثة (وهمية)
  const recentActivity = [
    { title: lang === "fr" ? "Dérivation" : "الاشتقاق", level: "1BAC", progress: 85, subject: "math" },
    { title: lang === "fr" ? "Ondes mécaniques" : "الموجات الميكانيكية", level: "2BAC", progress: 60, subject: "physics" },
    { title: lang === "fr" ? "Nombres complexes" : "الأعداد العقدية", level: "2BAC", progress: 40, subject: "math" },
    { title: lang === "fr" ? "Calcul intégral" : "الحساب التكاملي", level: "2BAC", progress: 100, subject: "math" },
    { title: lang === "fr" ? "Circuit RLC" : "دارة RLC", level: "2BAC", progress: 30, subject: "physics" }
  ];

  // 🏆 نتائج Quiz (وهمية)
  const quizResults = [
    { date: "21/04/2026", score: 7, total: 8, percentage: 88 },
    { date: "18/04/2026", score: 5, total: 8, percentage: 63 },
    { date: "15/04/2026", score: 8, total: 8, percentage: 100 }
  ];

  // 📑 التبويبات
  const dashTabs = [
    { id: "overview", label: lang === "fr" ? "Vue d'ensemble" : "نظرة عامة", Icon: BarChart3 },
    { id: "courses", label: lang === "fr" ? "Mes cours" : "دروسي", Icon: BookOpen },
    { id: "quiz", label: lang === "fr" ? "Mes quiz" : "اختباراتي", Icon: Trophy },
    { id: "favorites", label: lang === "fr" ? "Favoris" : "المفضلة", Icon: Heart }
  ];

  return (
    <div className="min-h-screen">

      {/* ═══════ 🎨 رأس الترحيب ═══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white py-10 md:py-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[200px] opacity-10 select-none">
            👋
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-blue-200 mb-1">
                {lang === "fr" ? "Bienvenue" : "مرحباً بك"}
              </div>
              <h1 className="text-3xl md:text-4xl font-black">
                {user.name} 🎓
              </h1>
              <p className="text-sm text-blue-100 mt-1">
                {lang === "fr" ? "Votre parcours d'apprentissage" : "مسارك التعليمي"}
              </p>
            </div>
            <button
              onClick={() => setUser(null)}
              className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all text-sm font-bold"
            >
              <LogOut size={14} />
              {lang === "fr" ? "Déconnexion" : "خروج"}
            </button>
          </div>

          {/* 📊 شريط الإحصائيات */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/25 transition-all">
                <s.Icon size={20} className="text-white/80 mb-2" />
                <div className="text-2xl md:text-3xl font-black">{s.value}</div>
                <div className="text-xs text-white/80 font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 📑 التبويبات ═══════ */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {dashTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.Icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ 📦 محتوى Dashboard ═══════ */}
      <section className="py-10 md:py-14 bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── نظرة عامة ─── */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6">

              {/* 📚 الأنشطة الحديثة */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-800">
                    {lang === "fr" ? "Dernière activité" : "آخر نشاط"}
                  </h3>
                  <span className="text-xs font-bold text-slate-500">{recentActivity.length} {lang === "fr" ? "cours" : "درس"}</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                        item.subject === "math"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                          : "bg-gradient-to-br from-violet-500 to-purple-600"
                      }`}>
                        {item.subject === "math" ? <Calculator size={18} className="text-white" /> : <FlaskConical size={18} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-800 truncate">{item.title}</span>
                          <span className="text-xs font-black text-blue-600 flex-shrink-0 ms-2">{item.progress}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-500">{item.level}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.progress === 100 ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-blue-500 to-indigo-500"
                              }`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 📊 الجانب الأيمن: تقدم سريع + اقتراح */}
              <div className="space-y-4">

                {/* كارت تقدم الأسبوع */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl"></div>
                  <div className="relative">
                    <div className="text-xs font-bold text-emerald-100 mb-1">
                      {lang === "fr" ? "Progression cette semaine" : "تقدم هذا الأسبوع"}
                    </div>
                    <div className="text-4xl font-black mb-2">+23%</div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-white/80 rounded-full"></div>
                    </div>
                    <div className="text-xs text-emerald-100 mt-2">
                      78% {lang === "fr" ? "de l'objectif hebdomadaire" : "من الهدف الأسبوعي"}
                    </div>
                  </div>
                </div>

                {/* اقتراح Quiz */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                      <Target size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-800">
                        {lang === "fr" ? "Quiz quotidien" : "اختبار يومي"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {lang === "fr" ? "8 questions • ~4 min" : "8 أسئلة • ~4 دقائق"}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate({ name: "quiz" })}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    {lang === "fr" ? "Lancer le quiz" : "ابدأ الاختبار"} 🎯
                  </button>
                </div>

                {/* اقتراح درس */}
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-xs font-bold text-slate-500 mb-2">
                    {lang === "fr" ? "Continuer le cours" : "تابع الدرس"}
                  </div>
                  <div className="text-sm font-black text-slate-800 mb-3">
                    {lang === "fr" ? "Nombres complexes" : "الأعداد العقدية"}
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full w-[40%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-slate-500">40% {lang === "fr" ? "terminé" : "مكتمل"}</div>
                </div>
              </div>
            </div>
          )}

          {/* ─── دروسي ─── */}
          {activeTab === "courses" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md mb-3 ${
                    item.subject === "math" ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-violet-500 to-purple-600"
                  }`}>
                    {item.subject === "math" ? <Calculator size={18} className="text-white" /> : <FlaskConical size={18} className="text-white" />}
                  </div>
                  <h3 className="font-black text-slate-800 mb-1">{item.title}</h3>
                  <div className="text-xs text-slate-500 mb-3">{item.level}</div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${item.progress === 100 ? "bg-emerald-500" : "bg-blue-500"}`} style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{item.progress}%</span>
                    <span className={`text-xs font-bold ${item.progress === 100 ? "text-emerald-600" : "text-blue-600"}`}>
                      {item.progress === 100 ? (lang === "fr" ? "Terminé ✓" : "مكتمل ✓") : (lang === "fr" ? "En cours" : "قيد الإنجاز")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── اختباراتي ─── */}
          {activeTab === "quiz" && (
            <div className="max-w-2xl mx-auto space-y-4">
              {quizResults.map((qr, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg font-black text-lg text-white ${
                    qr.percentage >= 80 ? "bg-gradient-to-br from-emerald-500 to-teal-500" :
                    qr.percentage >= 50 ? "bg-gradient-to-br from-blue-500 to-indigo-500" :
                    "bg-gradient-to-br from-amber-500 to-orange-500"
                  }`}>
                    {qr.percentage}%
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-black text-slate-800">{qr.score}/{qr.total} {lang === "fr" ? "bonnes réponses" : "إجابات صحيحة"}</div>
                    <div className="text-xs text-slate-500">{qr.date}</div>
                  </div>
                  <div>
                    {qr.percentage >= 80 ? <span className="text-2xl">🏆</span> :
                     qr.percentage >= 50 ? <span className="text-2xl">👏</span> :
                     <span className="text-2xl">💪</span>}
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <button
                  onClick={() => navigate({ name: "quiz" })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Target size={16} />
                  {lang === "fr" ? "Nouveau quiz" : "اختبار جديد"}
                </button>
              </div>
            </div>
          )}

          {/* ─── المفضلة ─── */}
          {activeTab === "favorites" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 text-center border-2 border-dashed border-slate-200">
                <Heart size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  {lang === "fr" ? "Vos favoris" : "مفضلتك"}
                </h3>
                <p className="text-sm text-slate-600">
                  {lang === "fr"
                    ? "Les cours que vous marquez avec ❤️ apparaîtront ici"
                    : "الدروس التي تضيفها بـ ❤️ ستظهر هنا"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🔻 مكون Footer - التذييل
   يحتوي: معلومات الموقع، روابط، اتصال، شبكات التواصل
═══════════════════════════════════════════════════════════════ */
const Footer = () => {
  const { lang, t } = useLang();

  // 🔗 الشبكات الاجتماعية
  const socials = [
    { icon: MessageCircle, color: "hover:bg-blue-600", label: "Facebook" },
    { icon: Video, color: "hover:bg-red-600", label: "YouTube" },
    { icon: Camera, color: "hover:bg-pink-600", label: "Instagram" },
    { icon: Send, color: "hover:bg-sky-500", label: "Telegram" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">

      {/* 🌊 شريط علوي زخرفي */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500"></div>

      {/* 🌈 خلفيات ضوئية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* الشبكة الرئيسية */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* عمود 1: عن الموقع */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Atom size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-sm">{t.siteName}</div>
                <div className="text-[10px] text-blue-300">{t.tagline}</div>
              </div>
            </div>
            <p className="text-sm text-blue-200/70 leading-relaxed">{t.footer.aboutText}</p>
          </div>

          {/* عمود 2: روابط سريعة */}
          <div>
            <h4 className="font-black text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-violet-400 rounded-full"></span>
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-blue-200/70">
              <li><a href="#home" className="hover:text-white hover:translate-x-1 inline-block transition-all">{t.nav.home}</a></li>
              <li><a href="#levels" className="hover:text-white hover:translate-x-1 inline-block transition-all">{t.nav.levels}</a></li>
              <li><a href="#subjects" className="hover:text-white hover:translate-x-1 inline-block transition-all">{t.nav.subjects}</a></li>
              <li><a href="#exams" className="hover:text-white hover:translate-x-1 inline-block transition-all">{t.nav.exams}</a></li>
            </ul>
          </div>

          {/* عمود 3: الاتصال */}
          <div>
            <h4 className="font-black text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-violet-400 rounded-full"></span>
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-blue-200/70">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400" />
                <span>contact@mathphysique.ma</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400" />
                <span>06 20 54 03 77</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" />
                <span>{lang === "fr" ? "Maroc" : "المغرب"} 🇲🇦</span>
              </li>
            </ul>
          </div>

          {/* عمود 4: الشبكات الاجتماعية */}
          <div>
            <h4 className="font-black text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-violet-400 rounded-full"></span>
              {t.footer.follow}
            </h4>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a key={i} href="#"
                  className={`w-10 h-10 rounded-xl bg-white/10 ${s.color} flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg`}
                  aria-label={s.label}>
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* خط فاصل + حقوق النشر */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-200/60">
          <div>© 2026 {t.siteName}. {t.footer.rights}.</div>
          <div className="flex items-center gap-1.5">
            {t.footer.madeBy}
            <Heart size={12} className="fill-rose-500 text-rose-500 animate-pulse" />
            <span className="font-bold text-white">Prof. B. Bouazza</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════════════════════
   🎬 المكون الرئيسي - يجمع كل شيء
   يُدير: اللغة + اتجاه الصفحة (RTL/LTR) + التنقل بين الصفحات
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("fr");
  const [page, setPage] = useState({ name: "home" });
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const t = translations[lang];
  const isRTL = lang === "ar";

  // 🔄 تحديث اتجاه الصفحة عند تبديل اللغة
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [isRTL, lang]);

  // 🧭 دالة التنقل: تغيّر الصفحة + تمرر للأعلى
  const navigate = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🎯 تحديد المحتوى حسب الصفحة الحالية
  const renderPage = () => {
    switch (page.name) {
      case "home":
        return (
          <>
            <Hero />
            <LevelsSection />
            <SubjectsSection />
            <AdvantagesSection />
            <TestimonialsSection />
            <FaqSection />
            <CtaSection />
          </>
        );
      case "level":
        return <LevelPage levelId={page.levelId} />;
      case "subject":
        return <SubjectPage levelId={page.levelId} subjectId={page.subjectId} />;
      case "course":
        return <CoursePage levelId={page.levelId} subjectId={page.subjectId} courseId={page.courseId} />;
      case "quiz":
        return <QuizPage />;
      case "dashboard":
        return <DashboardPage user={user} setUser={setUser} />;
      default:
        return <Hero />;
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <RouterContext.Provider value={{ page, navigate, user, setUser, showAuth, setShowAuth }}>
        <div
          className="min-h-screen bg-slate-50"
          style={{
            fontFamily: isRTL
              ? "'Segoe UI', 'Tahoma', system-ui, sans-serif"
              : "'Inter', system-ui, sans-serif"
          }}
        >
          {/* ─── الشريط العلوي (دائماً ظاهر) ─── */}
          <Navbar />

          {/* ─── المحتوى المتغيّر ─── */}
          <main>{renderPage()}</main>

          {/* ─── التذييل (دائماً ظاهر) ─── */}
          <Footer />

          {/* ─── نافذة تسجيل الدخول (إذا كانت مفتوحة) ─── */}
          {showAuth && (
            <AuthModal
              onClose={() => setShowAuth(false)}
              onLogin={(u) => { setUser(u); setShowAuth(false); }}
            />
          )}
        </div>
      </RouterContext.Provider>
    </LangContext.Provider>
  );
}
