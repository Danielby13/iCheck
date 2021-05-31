import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import Text from "../components/Text";

export default SecurityPolicyScreen = () => {
  // security policy screen
  return (
    <ScrollView>
      <Container>
        <SecurityPolicy>
          <SecurityPolicyTitle>מדיניות ואבטחה</SecurityPolicyTitle>
          <SecurityPolicyContent>
            אפליקציית iCheck נוקטת באמצעים טכניים, פיזיים, חוקיים וארגוניים
            בהתאם לחוקים החלים בעניין פרטיות ואבטחת מידע. לצערנו, שום העברה או
            אחסון באמצעות האינטרנט בטוחים ב-100%. אם יש לך סיבה להאמין כי
            התקשרותך עמנו אינה בטוחה עוד (לדוגמא, אם הנך מרגיש כי האבטחה של כל
            מידע אישי אשר ייתכן וחלקת עמנו הועמדה בסכנה), אנא ידע אותנו מיידית.
            {"\n"}
            כאשר החברה מספקת מידע אישי לנותן שירות, נותן השירות ייבחר בצורה
            דקדקנית ויידרש להשתמש באמצעים הנאותים כדי להגן על חיסיון ואבטחת
            המידע האישי ולפעול בהתאם להנחיות התקפות של הרשויות המוסמכות השונות.
            {"\n"}
            החברה עושה כל שביכולתה כדי להגן על סודיות הנתונים שנמסרו על- ידי
            הלקוחות, תוך שימוש בטכנולוגיות אבטחה מתקדמות. אבטחת המידע באתר נועדה
            להבטיח את זיהוי הלקוח ולהצפין את נתוני הזיהוי המועברים בתהליך.{" "}
            {"\n"}
            ההתקשרות בין האפליקציה לבין שרת החברה מוצפנת ומאובטחת באמצעות שיטות
            הצפנה חדישות ועל-ידי מנגנוני הצפנה שהינם בהתאם לתקנים בינלאומיים
            בנושא הצפנת מידע בתחום של מסחר אלקטרוני. מטרת יצירת הקשר המאובטח
            הינה למנוע מהמידע המועבר להיחשף לעיני משתמשים אחרים ברשת האינטרנט.
            {"\n"}
            אפליקציית iCheck מתעדכנת באופן שוטף בהתפתחויות הטכנולוגיות בתחומי
            התוכנה והחומרה, על-מנת לספק ללקוחותיה את ההגנה הטובה ביותר מפני
            חדירה או פריצה. עם זאת, אין ביכולתה שלהחברה לאבטח את מערכות המידע
            והתקשרות באופן מוחלט, החסין לחלוטין מפני חדירות בלתי מורשות ומפני
            שימוש אסור במידע הנמסר על-ידי המבקרים באתר לא תישא בכל אחריות במקרים
            של גילוי ושימוש במידע הנ"ל הנובעים מחדירות בלתי מורשות של אחרים.
            {"\n"}
            {"\n"}
            <SubTitle>הונאה מקוונת- "פישינג"{"\n"}</SubTitle>
            איסור העברת אימייל וסיסמא – ייתכן כי גורמים שונים ינסו לחדור לאתר על
            ידי שימוש באמצעי ההזדהות שקיבלת מהאפליקציה. לכן, לעולם אל תעביר את
            שם האימייל ו/או סיסמת הגישה שלך בדואר אלקטרוני, בפקס או בעל פה לכל
            גורם שהוא. {"\n"}
            הזהר מהודעות דוא"ל מזויפות – הודעות דוא"ל מזויפות הנן הודעות
            הנשלחות, כביכול, מהחברה או מחברה מוכרת אחרת. הודעות אלה מבקשות ממקבל
            ההודעה להיכנס לאתר החברה באמצעות קישור הניתן בתוך ההודעה, ולמסור או
            לעדכן את נתוני ההזדהות שלו (סיסמאות, קוד אימות וכדומה).הפנייה נעשית
            לעיתים קרובות תוך פירוט הסיבות בגינן נדרש העדכון: סיבות ביטחון,
            שדרוג מערכות וכדומה. הקישור בהודעה יכול להיות חיקוי מדויק של החברה
            ממנה כביכול נשלח המכתב. בדרך זו, מנסים, שלא כדין, להשיג את נתוני
            ההזדהות של הנמען לצורך גישה לחשבונו.{"\n"}
            לידיעתך, בשום מקרה לא תפנה החברה ללקוחותיה בדוא"ל בו הם יתבקשו לעדכן
            את פרטיהם האישיים ו/או יתבקשו למסור את הקוד האימות שלהם. אין להיענות
            לבקשה לביצוע עדכון פרטים, המתקבלת באמצעות דוא"ל ואין למסור את
            האימייל ואת הסיסמה לאף גורם.
          </SecurityPolicyContent>
        </SecurityPolicy>
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  flex: 1;
`;

const SecurityPolicy = styled.View`
  margin-top: 10px;
`;

const SecurityPolicyTitle = styled(Text)`
  color: #8e93a1;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin: 10px;
`;

const SecurityPolicyContent = styled(Text)`
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  padding: 10px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

const SubTitle = styled(Text)`
  font-size: 18px;
  text-align: left;
`;
