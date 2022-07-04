const { appendFileSync } = require("fs");

exports.writeLogs = (message) => {
    try {
        let options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };          
        const date = new Intl.DateTimeFormat('id', options).format(new Date());

        appendFileSync(`${__dirname}/../logs/SendWhatsappError.txt`, `\n[${date}]:\t${message}`);
    } catch(error) {
        console.error(error)
        throw new Error(error);
    }
};