import { getRepository } from 'typeorm'
import { Tweet } from './entity/Tweet';
import { User } from './entity/User'

export const UserCreate = async () => {
    const userRepo = getRepository(User)
    const user = userRepo.create({ firstName: "Nhan", lastName: "Phan", age: 35 });
    await userRepo.save(user).catch(err => {
        console.log("Error ", err)
    })
    console.log("New User Saved", user)

    const tweetRepo = getRepository(Tweet);
    const tweet = new Tweet();
    tweet.title = "I finally got a new school"
    tweet.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    tweet.user = Promise.resolve(user)
    await tweetRepo.save(tweet).catch(err => console.log("Error ", err))
}

export const FindUsers = async () => {
    const userRepo = getRepository(User)

    const users = await userRepo.find({ where: { firstName: "Nhan" } }).catch(err => console.log("Find Error: ", err))
    const user = await userRepo.findOne({ where: { firstName: "Nhan" } }).catch(err => console.log("Find One Error: ", err))

    if (users) {
        console.log("Find Users: ", users)
    }
    if (user) {
        console.log("Find User: ", user, await user.tweets)
    }
}