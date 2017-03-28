const CF = require('./aws-promisify')

module.exports = function(stackName) {
  var callback = this.async();
  const params = { StackName: stackName };
  CF.describeStackEventsAsync(params)
    .then(function(data) {
      if(!data.StackEvents) {
        throw data;
      }
      emit('cf-events-found', {
        events: data.StackEvents,
        status: data.StackEvents[0].ResourceStatus
      });
    })
    .catch(function(err){
      emit('cf-events-error', {
        error: err
      });
    })
    .then(callback);
};
