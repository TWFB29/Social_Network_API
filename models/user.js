const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            Unique: true,
            required: true,
            trimmed: true
        },
        email:
        {
            type: String,
            Unique: true,
            required: true,
            match: [/.+\@.+\..+/]

        },
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

    userSchema.virtual('friendCount').get(function(){
        return this.friends.length
    });

    const user = model('user', userSchema);

    module.exports = user;
    
