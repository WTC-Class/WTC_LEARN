WTC Learn v2.2 READY Setup

1) Upload all files/folders to GitHub repository: WTC_LEARN
2) Keep structure exactly:
   index.html
   admin.html
   assets/css/main.css
   assets/js/api.js
   assets/js/auth.js
   assets/js/main.js
   assets/js/admin.js
   assets/js/toast.js
   assets/js/chapter_master.js
   backend/WTC_LEARN_API_Code_v2_2.gs
   content/...

3) GitHub Pages:
   Settings > Pages > Deploy from branch > main > /root
   Live URL: https://wtc-class.github.io/WTC_LEARN/

4) Google Sheet:
   Upload WTC_LEARN_DB_Template_v2_2_PRO.xlsx to Google Drive.
   Convert to Google Sheet and name it WTC_LEARN_DB.

5) Apps Script:
   Open WTC_LEARN_DB > Extensions > Apps Script.
   Paste backend/WTC_LEARN_API_Code_v2_2.gs.
   Run setupWtcLearnDb() once if you want to recreate sheet headers.
   Deploy > New deployment > Web app.
   Execute as: Me. Access: Anyone.

6) Connect frontend:
   Open assets/js/api.js.
   Paste the Web App URL into:
   WEB_APP_URL: 'YOUR_SCRIPT_URL_HERE'

7) Admin login:
   Default admin phone: 9537036383
   Default password: wtc@12345
   Important: Change this after first setup.

8) Admin powers in v2.2:
   - Admin login
   - View students
   - Edit student profile inline
   - Reset password
   - Disable student
   - View marks
   - View chapter links from sheet

9) Current content links:
   Main website uses assets/js/chapter_master.js for GitHub links.
   CHAPTER_MASTER sheet is ready for future API-driven content links.
