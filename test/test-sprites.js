var expect = require('expect.js');
var fs = require('fs');
var oakdexPokedex = require('oakdex-pokedex');

describe('Sprites', function() {
  describe('icons/', function() {
    it('has images for every pokemon', function(done) {
      oakdexPokedex.allPokemon(function(pokemon) {
        pokemon.map(function(p) {
          var pad = '000';
          var imageName = (pad+p.national_id).slice(-pad.length);
          var path = './icons/'+ imageName +'.png';
          console.log(path);
          expect(fs.existsSync(path)).to.equal(true);

          p.variations.map(function(v) {
            if(v.image_suffix) {
              var imageName = (pad+p.national_id).slice(-pad.length);
              var path = './icons/'+ imageName +'-'+ v.image_suffix +'.png';
              console.log(path);
              expect(fs.existsSync(path)).to.equal(true);
            }
          });

          p.mega_evolutions.map(function(v) {
            var imageName = (pad+p.national_id).slice(-pad.length);
            if(v.image_suffix) {
              var path = './icons/'+ imageName +'-'+ v.image_suffix +'.png';
              console.log(path);
              expect(fs.existsSync(path)).to.equal(true);
            } else {
              var path = './icons/'+ imageName +'-mega.png';
              console.log(path);
              expect(fs.existsSync(path)).to.equal(true);
            }
          });
        });
        done();
      });
    });
  });
});
