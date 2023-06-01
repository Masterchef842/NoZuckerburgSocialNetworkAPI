const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs')

function formatDate(date){
    const formattedDate=dayjs(date).formatDate('DD/MM/YYYY')
    return formattedDate;
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required:true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get : formatDate
        },


    },
    {
        toJSON: {
            getters: true,
        },
    }
)


module.exports=reactionSchema