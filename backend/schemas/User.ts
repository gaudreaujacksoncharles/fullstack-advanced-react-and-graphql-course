import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const User = list({
    access: {
        create: () => true,
        //read: rules.canManageUsers,
        read: true,
        update: rules.canManageUsers,
        // only people with the permission can delete themselves!
        // You can't delete yourself
        delete: permissions.canManageUsers,
    },
    ui: {
        // hide the backend UI from regular users
        hideCreate: (args) => !permissions.canManageUsers(args),
        hideDelete: (args) => !permissions.canManageUsers(args),
    },
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        photo: relationship({
            ref: 'UserImage.user',
            ui: {
                displayMode: 'cards',
                cardFields: ['image', 'altText'],
                inlineCreate: { fields: ['image', 'altText'] },
                inlineEdit: { fields: ['image', 'altText'] },
            },
        }),
        cart: relationship({
            ref: 'CartItem.user',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'read' },
            },
        }),
        orders: relationship({ ref: 'Order.user', many: true }),
        role: relationship({
            ref: 'Role.assignedTo',
            access: {
                create: permissions.canManageUsers,
                update: permissions.canManageUsers,
            },
        }),
        products: relationship({
            ref: 'Product.user',
            many: true,
        }),
        events: relationship({
            ref: 'Event.user',
            many: true
        }),
    },
});