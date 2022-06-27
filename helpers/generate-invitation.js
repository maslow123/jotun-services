const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

exports.generateInvitation = async ({
    name, department, branches
}, filename) => {
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
            value: department
        },
        {
            field: 'Kantor Cabang',
            value: branches
        },
    ];
    const invitationPath = `${__dirname}/../assets/invitations/${filename}`;
    loadImage(`${__dirname}/../assets/templates/invitation.png`)
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
        await loadImage(`${__dirname}/../assets/qr-code/${filename}`)
        .then(async img => {
            context.drawImage(img, 800, 880, 300, 300)
        })
        const buffer = await canvas.toBuffer('image/png');
        fs.writeFileSync(invitationPath, buffer)

        // remove QR File
        fs.unlinkSync(`${__dirname}/../assets/qr-code/${filename}`);
    });
    return invitationPath;
};