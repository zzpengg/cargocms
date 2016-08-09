module.exports = {

  debug: async(req, res) => {
    res.ok({
      user: req.session.passport.user
    });
  },

  findAll: async (req, res) => {
    try {
      const users = await UserService.findAll();
      res.ok({
        data: {
          items: users
      }});
    } catch (e) {
      res.serverError({ message: e, data: {}});
    }
  },
  find: async (req, res) => {
    console.log("=== user find ===");
    const { id } = req.params;
    try {
      const user = await User.findOneWithPassport({id})
      sails.log.info('get user =>', user);
      res.ok({
        message: 'Get user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e, data: {}});
    }
  },

  create: async (req, res) => {
    const data = req.body;
    try {
      sails.log.info('create user controller=>', data);
      const user = await UserService.create(data);
      res.ok({
        message: 'Create user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e.message, data: {}});
    }
  },

  update: async (req, res) => {
    const { userId } = req.params;
    const data = req.body;
    try {
      sails.log.info('update user controller userId=>', userId);
      sails.log.info('update user controller data=>', data);
      const user = await UserService.update({
        id: userId,
        ...data,
      });
      res.ok({
        message: 'Update user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e.message, data: {}});
    }
  },

  destroy: async (req, res) => {
    const { userId } = req.params;
    try {
      sails.log.info('delete user controller=>', userId);
      const user = await User.deleteById(userId);
      res.ok({
        message: 'Delete user success.',
        data: user,
      });
    } catch (e) {
      res.serverError({ message: e.message, data: {}});
    }
  }
}
