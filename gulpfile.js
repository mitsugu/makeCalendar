const gulp = require('gulp');
const ejs = require('gulp-ejs');
const through = require('through2');
const moment = require('moment');
const path = require('path');

gulp.task('calendar', () => {
    const year = 2025;
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return gulp.src('template.ejs')
        .pipe(through.obj(function (file, enc, cb) {
            months.forEach(month => {
                const firstDay = moment(`${year}-${month}-01`, "YYYY-MM-DD");
                const daysInMonth = firstDay.daysInMonth();
                const firstDayOfWeek = firstDay.day();

                const calendar = [];
                let week = [];
                for (let i = 0; i < firstDayOfWeek; i++) {
                    week.push('');
                }
                for (let day = 1; day <= daysInMonth; day++) {
                    week.push(day);
                    if ((firstDayOfWeek + day) % 7 === 0) {
                        calendar.push(week);
                        week = [];
                    }
                }
                if (week.length > 0) {
                    calendar.push(week);
                }

                const data = {
                    year: year,
                    month: month,
                    monthName: firstDay.format('MMMM'), 
                    calendar: calendar,
                };

                const newFile = file.clone();
                newFile.data = data;
                newFile.path = path.join(file.base, year + ("0" + month).slice(-2) + ".html");
                this.push(newFile);
            });
            cb();
        }))
        .pipe(ejs())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('calendar'));
