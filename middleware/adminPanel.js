export default function ({ $auth,store,error }) {
  if (!$auth.loggedIn || !store.getters['perm/checkPerm']('adminpanel', $auth.user)) {
    error({ statusCode: 404, message: 'Страница не найдена' })
  }
}
