(function(){
  angular
    .module('app')
    .controller('ControllerController', myTextArea);

  function myTextArea(output, d3Lines) {
    var vm = this;

    vm.codemirrorLoaded = codemirrorLoaded;
    vm.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'text/javascript',
    };

    ////////////

    function codemirrorLoaded(_editor) {
      _editor.setValue(`angular
      	.module('myApp')
      	.controller('myController',myController)
        function myController(vm){
          vm.movie = 'Frozen';
          vm.getMovie = function(){
            console.log(vm.movie);
          }
        }
      `);
      output.controller = _editor.getValue();
      output.render();
      _editor.on('change', function(inst, changes) {
        output.controller = _editor.getValue();
        d3Lines.lineFunction('.cm-string:contains(myController)');
        output.render();
        setTimeout(function() {
          d3Lines.lineFunction('.cm-string:contains(myController)');
        },0);
      });
    }
  }
}());
