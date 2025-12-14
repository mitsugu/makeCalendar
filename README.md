## What's this?
Create a monthly calendar for 2026.

## Install
```bash
git clone https://github.com/mitsugu/makeCalendar.git
cd makeCalendar
npm gulp gulp-ejs gulp-rename moment
```

## Run
```bash
npx gulp
```

## Result
Output a monthly calendar in HTML format to the dist directory.

## Note
The output is HTML, so edit it to your liking, and convert it to PDF in your web browser if you prefer. Also, if you replace "const year = 2026;" on line 9 with the year you want to create, a monthly calendar for the specified year will be automatically created.

