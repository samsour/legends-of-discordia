// TODO: refactor this to use __mocks__ folder in project root which is supposed to be read automatically
// by jest. You might have to remove __mocks__ from ignore prop inside jest.config.js.
// It may then be used something like this:
// Message = jest.fn(() => ({
//     content: '',
//     member: {
//         hasPermission: jest.fn(),
//         ...
//     }
//     ...
// }));
//
// Message.member.hasPermission.mockReturnValueOnce((new Set)....)

export const Message = function (guildRoles = [], memberRoles = [], messageContent = '') {
    const memberRolesSet = new Set(memberRoles);
    return {
        content: messageContent,
        member: {
            hasPermission(role) {
                return memberRolesSet.has(role);
            },
            roles: {
                cache: memberRolesSet,
            },
        },
        guild: {
            roles: {
                cache: guildRoles,
            },
        },
    }
};
