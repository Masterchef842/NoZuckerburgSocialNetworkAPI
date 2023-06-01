const dayjs = require('dayjs')
const { Schema, model } = require('mongoose');

function formatDate(date){
    const formattedDate=dayjs(date).formatDate('DD/MM/YYYY')
    return formattedDate;
}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get : formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'reaction'

        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
    }
)

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})


const Thought = model('thought', thoughtSchema)

module.exports= Thought;