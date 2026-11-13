# BEE Realty Group — Global Real Estate & Advisory Website

## Quick Deployment on GitHub Pages
1. Create a new public GitHub repository (e.g., `bee-realty-group`).
2. Upload `index.html`, `app.js`, and the entire `assets/` folder into the root of the repository.
3. Go to **Settings -> Pages**, select `main` branch and `/ (root)`, and click **Save**.
4. Share your live `https://<username>.github.io/bee-realty-group/` link with BEE Realty Group.

## Connecting the Google Sheets CMS
1. Upload `google_sheet_template.csv` to Google Drive and open it with **Google Sheets**.
2. Click **File -> Share -> Publish to web**, choose **Comma-separated values (.csv)**, and copy the generated URL.
3. Paste the URL into `const GOOGLE_SHEET_CSV_URL = "YOUR_LINK_HERE";` inside `app.js`.
