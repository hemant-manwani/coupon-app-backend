describe('User model functions', function() {
  describe('Compare Passwords', function() {
    it ('compares correct password with its hash', function(done) {
      User.comparePassword("dilip", fixtures.user[0], function(err, valid){
        valid.should.be.eql(true);
        done();
      })
    });

    it ('compares incorrect password with its hash', function(done) {
      User.comparePassword("dilip1", fixtures.user[0], function(err, valid){
        (valid !== true).should.be.be.eql(true);
        done();
      })
    });
  });
});
