const fs = require('fs')
const { createCanvas, loadImage } = require('canvas');
const { DEPARTMENTS, BRANCHES } = require('./constants');

exports.generateInvitation = async ({
    name, department, branches, phone_number
}) => {
    const width = 1200
    const height = 1400

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#FFF'
    context.fillRect(0, 0, width, height)

    const info = [
        {
            field: 'Nama',
            value: name
        },
        {
            field: 'Department',
            value: DEPARTMENTS[department]
        },
        {
            field: 'Lokasi',
            value: BRANCHES[branches]
        },
    ];
    const invitationPath = `${__dirname}/../assets/invitations/inv-${phone_number}.png`;
    const invitationTemplate = `${__dirname}/../assets/templates/invitation.png`;
    
    
    await loadImage(invitationTemplate)
    .then(async image => {
        context.drawImage(image, 0, 0, 1200, 1400)
        let counter = 1;
        for (let prop of info) {     
            let fieldX = 100;
            let fieldY = counter + 900;

            context.font = "25pt Calibri";
            context.fillText(prop.field, fieldX, fieldY);
            
            fieldY = counter + 940;
            context.font = "bold 30pt Calibri";
            context.fillText(prop.value, fieldX, fieldY);

            counter += 100
        }

        // load QR Code
        await loadImage(`${__dirname}/../assets/qr-code/qr-${phone_number}.png`)
        .then(async img => {
            context.drawImage(img, 750, 830, 350, 350)
        })
        const buffer = await canvas.toBuffer('image/png');
        fs.writeFileSync(invitationPath, buffer)

        // remove QR File
        fs.unlinkSync(`${__dirname}/../assets/qr-code/qr-${phone_number}.png`);
    });
    return invitationPath;
};