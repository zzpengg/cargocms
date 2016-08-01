describe('about User Controller operation.', function() {

  it('create User should success.', async (done) => {
    const createThisUser = {
      username: 'xxxx',
      email: 'xxx@xxx.xxx',
      firstName: 'test',
      lastName: 'test',
      locale: 'zh_TW',
    };
    try {
      const res = await request(sails.hooks.http.app)
      .post(`/user`)
      .send(createThisUser);
      sails.log.info('create user controller spec =>', res.body);
      res.body.should.be.Object;
      res.body.data.email.should.be.equal(createThisUser.email);
      res.body.data.locale.should.be.equal('zh_TW');
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find all users', () => {
    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app).get(`/user`);
        sails.log.info('find users controller spec =>', res.body);
        res.body.data.should.be.Array;
        res.body.success.should.be.equal(true);
        res.body.data.items.length.should.be.above(0);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('find one user', () => {
    let findThisUser;
    before(async (done) => {
      try {
        findThisUser = await UserService.create({
          username: 'findThisUser',
          email: 'findThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('findThisUser.data.id=>', findThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .get(`/user/${findThisUser.data.id}`);
        sails.log.info('find one user controller spec =>', res.body);
        res.body.data.should.be.Object;
        res.body.data.id.should.be.Number;
        res.body.data.id.should.be.equal(findThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('delete user', () => {
    let deleteThisUser;
    before(async (done) => {
      try {
        deleteThisUser = await UserService.create({
          username: 'deleteThisUser',
          email: 'deleteThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        sails.log.info('deleteThisUser.data.id=>', deleteThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .delete(`/user/${deleteThisUser.data.id}`);
        sails.log.info('delete user controller spec =>', res.body);
        res.body.data.id.should.be.equal(deleteThisUser.data.id);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe.only('update user', () => {
    let updateThisUser;
    const updatedUser = {
      username: 'updated',
      email: 'update@update.update',
      firstName: 'Kent',
      lastName: 'Chen',
      locale: 'hk',
      password: '000000',
    };
    let originPassport;
    before(async (done) => {
      try {
        updateThisUser = await User.create({
          username: 'updateThisUser',
          email: 'updateThisUser@xxx.xxx',
          firstName: 'test',
          lastName: 'test',
          locale: 'zh_TW',
        });
        originPassport = await Passport.create({provider: 'local', password: '123123', UserId: updateThisUser.id});
        sails.log.info('updateThisUser.data.id=>', updateThisUser.id);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        const res = await request(sails.hooks.http.app)
        .post(`/user/${updateThisUser.id}`)
        .send(updatedUser);
        res.status.should.eq(200);
        res.body.data.locale.should.be.equal('hk');
        res.body.data.username.should.be.equal('updated');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
