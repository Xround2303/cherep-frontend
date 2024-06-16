import {defineStore} from "pinia";
import {ref} from "vue";
import {useForm} from "vee-validate";
import {useContextManager} from "@/plugins/contextManager";

export default defineStore("user_edit", () => {

    const {
        errors,
        meta,
        defineField,
        setFieldValue,
        resetForm,
        isValidating,
        validate
    } = useForm({
        validationSchema: {
            lastName: "required",
            email: "required|email",
            password: "min:6",
            roles: "required",
            firstName: "required",
            surname: "required"
        }
    });

    const [lastName, lastNameProps] = defineField("lastName");
    const [email, emailProps] = defineField("email");
    const [password, passwordProps] = defineField("password");
    const [resetPassword, resetPasswordProps] = defineField("resetPassword");
    const [resetPasswordInterval, resetPasswordIntervalProps] = defineField("resetPasswordInterval");
    const [roles, rolesProps] = defineField("roles");
    const [firstName, firstNameProps] = defineField("firstName");
    const [surname, surnameProps] = defineField("surname");
    const [timezone, timezoneProps] = defineField("timezone");
    const [onlyOneDevice, onlyOneDeviceProps] = defineField("onlyOneDevice");
    const [userBlocked, userBlockedProps] = defineField("userBlocked");

    const isLoadingDataForm = ref(false);
    const isLoadSaveForm = ref(false);

    const mutatorEmail = (value: string) => {
        email.value = value;
    };
    const mutatorFirstName = (value: string) => {
        firstName.value = value;
    };
    const mutatorLastName = (value: string) => {
        lastName.value = value;
    };
    const mutatorRoles = (value: string[]) => {
        roles.value = value;
    };
    const mutatorSurname = (value: string) => {
        surname.value = value;
    };
    const mutatorPassword = (value: string) => {
        password.value = value;
    };
    const mutatorTimezone = (value: string) => {
        timezone.value = value;
    };
    const mutatorOnlyOneDevice = (value: boolean) => {
        onlyOneDevice.value = value;
    };
    const mutatorUserBlocked = (value: boolean) => {
        userBlocked.value = value;
    };
    const mutatorResetPassword = (value: boolean) => {
        resetPassword.value = value;
    };
    const mutatorResetPasswordInterval = (value: boolean) => {
        resetPasswordInterval.value = value;
    };

    return {
        meta,
        errors,
        isLoadingDataForm,
        isLoadSaveForm,
        firstName,
        lastName,
        surname,
        email,
        roles,
        password,
        timezone,
        userBlocked,
        onlyOneDevice,
        resetPassword,
        resetPasswordInterval,
        resetForm,
        mutatorEmail,
        mutatorFirstName,
        mutatorLastName,
        mutatorSurname,
        mutatorPassword,
        mutatorRoles,
        mutatorOnlyOneDevice,
        mutatorUserBlocked,
        mutatorTimezone,
        mutatorResetPassword,
        mutatorResetPasswordInterval,
        onResetForm: () => {
            resetForm();
            onlyOneDevice.value = true;
        },
        onSaveEdit: async (userId: number) => {
            return useContextManager().axiosWithoutAuth().put(`/users/${userId}`, {
                fname: firstName.value,
                lname: lastName.value,
                mname: surname.value,
                email: email.value,
                password: password.value,
                change_password: false,
                refresh_password: resetPassword.value,
                refresh_password_interval: resetPasswordInterval.value,
                block: userBlocked.value ?? false,
                single_auth: false,
                roles: roles.value,
                timezone: timezone.value,
            }).finally(() => {
                isLoadSaveForm.value = false;
            });
        },
        onCreate: async () => {
            isLoadSaveForm.value = true;

            return useContextManager().axiosWithoutAuth().post("/users", {
                fname: firstName.value,
                lname: lastName.value,
                mname: surname.value,
                email: email.value,
                password: password.value,
                refresh_password: resetPassword.value,
                refresh_password_interval: resetPasswordInterval.value,
                single_auth: false,
                roles: roles.value,
                timezone: timezone.value,
            }).finally(() => {
                isLoadSaveForm.value = false;
            });

        },
        onLoad: async (userId: number) => {
            resetForm();
            isLoadingDataForm.value = true;

            const response = await useContextManager().axiosWithoutAuth().get(`/users/${userId}`);

            // Обновление записи без проверки валидации
            setFieldValue("firstName", response.data.fname, false);
            setFieldValue("lastName", response.data.lname, false);
            setFieldValue("surname", response.data.mname, false);
            setFieldValue("email", response.data.email, false);
            setFieldValue("timezone", response.data.timezone, false);
            setFieldValue("roles", response.data.roles, false);
            setFieldValue("resetPassword", response.data.refresh_password, false);
            setFieldValue("resetPasswordInterval", response.data.refresh_password_interval, false);

            mutatorUserBlocked(response.data.blocked_by);
            mutatorOnlyOneDevice(true);

            isLoadingDataForm.value = false;
        },
    };
});