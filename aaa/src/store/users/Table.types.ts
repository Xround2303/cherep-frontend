export type TRow = {
    id: number,
    email: string,
    fullname: string,
    roles: string[],
    created_at: string,
    updated_at: string,
    active: boolean,
    is_ldap: boolean,
    blocked_at: boolean,
}