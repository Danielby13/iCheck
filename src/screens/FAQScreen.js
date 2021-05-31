import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import Text from "../components/Text";

export default FAQScreen = () => {
  // answer and questions to why use our app
  return (
    <ScrollView>
      <Container>
        <FAQ>
          <FAQTitle large>האם החשבוניות נמחקות לאחר תקופה מסויימת?</FAQTitle>
          <FAQContent>
            לא, החשבונית נשמרת עד אשר המשתמש יבחר למחוק אותה
          </FAQContent>

          <FAQTitle>איך ניתן לשתף חשבוניות?</FAQTitle>
          <FAQContent>
            שיתוף חשבונית בודדת: כניסה לפירוט חשבונית ובחירה באפשרות "שיתוף
            חשבונית". יש להזין את מספר הפלאפון של המשתמש איתו תרצה לשתף את
            החשבונית.{"\n"}
            שיתוף כל החשבוניות: כניסה לתפריט הגדרות ובחירה באפשרות "שיתוף כל
            החשבוניות". יש להזין את מספר הפלאפון של המשתמש איתו תרצה לשתף את
            החשבוניות.
          </FAQContent>

          <FAQTitle large>
            החלפתי מספר פלאפון, איך אני שומר על היסטורית המנוי שלי?
          </FAQTitle>
          <FAQContent>
            א. יצירת חשבון חדש עם המספר החדש{"\n"}
            ב. שיתוף כל החשבוניות עם החשבון החדש (ראה שאלה 2){"\n"}
            ג. התחבר עם החשבון החדש, בחר בתפריט הראשי את האפשרות "חשבוניות
            לאישור" ואשר את החשבוניות{"\n"}
            ד. אופציונלי: כניסה לחשבון הישן ומחיקת המנוי (אין למחוק את המנוי
            לפני שאושרו כל החשבוניות)
          </FAQContent>

          <FAQTitle large>מה ההבדל בין איפוס חשבון לבין מחיקת חשבון?</FAQTitle>
          <FAQContent>
            איפוס חשבון מוחק את כל החשבוניות לצמיתות אך משאיר את המנוי. מחיקת
            חשבון מוחקת לצמיתות את כל החשבוניות ואת חשבון המשתמש.{"\n"}
            שתי הפעולות לא ניתנות לביטול לאחר אישורן.
          </FAQContent>

          <FAQTitle large>יצירת חשבונית ידנית חדשה</FAQTitle>
          <FAQContent>
            עבור חנויות שעדיין אינן תומכות בשיתוף חשבונית לאפליקציית iCheck,
            קיימת האפשרות להוסיף ידנית חשבוניות המכילות את סכום הרכישה הכללי
            לצורך שמירה ואיזון לסטטיסטיקת הוצאות.
          </FAQContent>

          <FAQTitle large>איך שומרים חשבונית שיש בה מוצרים באחריות?</FAQTitle>
          <FAQContent>
            בעמוד בו מפורטת החשבונית קיים לחצן "שמירת חשבונית למוצרים באחריות".
            לחיצה על לחצן זה, תפתח חלון ובו יש לרשום את כמות חודשי האחריות. כל
            החשבוניות האחריות מופיעות באפשרות "חשבוניות באחריות" בתפריט הראשי.
            {"\n"}
            חשבוניות שנגמרה עבורן האחריות, יורדות באופן אוטומטי מתצוגה זו.
          </FAQContent>

          <FAQTitle large>איך מעדכנים קטגוריה?</FAQTitle>
          <FAQContent>
            בעמוד בו מפורטת החשבונית, קיימת אפשרות לשינוי הקטגוריה. שינוי
            הקטגוריה משפיע על אופן תצוגת הגרפים בעמוד "סטטיסטיקת הוצאות"
          </FAQContent>

          <FAQTitle large>איך ניתן לקבל את החשבונית מהחנות?</FAQTitle>
          <FAQContent>
            לכל משתמש קיימות שתי אפשרויות:{"\n"}
            א. מסירת מספר הפלאפון של המנוי למוכר בחנות{"\n"}ב. כניסה לאפליקציה
            ובחירה באפשרות "סריקת חשבונית" בתפריט הראשי וסריקת קוד QR ממסוף
            החנות.
            {"\n"}
            בשתי האופציות החשבונית מתקבלת באופן מיידי באפליקציה.
          </FAQContent>
        </FAQ>
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  flex: 1;
`;

const FAQ = styled.View`
  margin-top: 10px;
`;

const FAQTitle = styled(Text)`
  color: #8e93a1;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin: 10px;
`;

const FAQContent = styled(Text)`
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  padding: 10px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;
