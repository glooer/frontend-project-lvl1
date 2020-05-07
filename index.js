import { VK } from 'vk-io';
import DB from './db';

const vk = new VK({
    token: '249fc274249fc274249fc274f824ee7fb52249f249fc2747a2b902f5eb6801db8f09e5e'
});



(async () => {
	const db = await DB.getDb();

	const users = await DB.getUsers(db);

	setInterval(async () => {
		const usersSeen = await getLastSeen(users.map(v => v.user_id));

		users.forEach((user) => {
			const vkUser = usersSeen[user.vk_id];

			DB.saveOnlineInfo(db, user.id, vkUser.last_seen.time, vkUser.online);
		})
	}, 1 * 1000)

})()

const getLastSeen = async (usersId) => {
    const response = await vk.api.users.get({
        user_ids: usersId,
				fields: ['last_seen', 'online']
    });

    return response.reduce((acc, val) => {
			acc[val.id] = val;

			return acc;
		}, {});
}







//
