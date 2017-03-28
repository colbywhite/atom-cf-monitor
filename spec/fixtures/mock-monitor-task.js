const REGION = 'us-west-2'
const ACCOUNT = '123456789012'
const STACK_NAME = 'test'
const STACK_ID = '12345678-90ab-cdef-ghij-klmnopqrstuv'
const STACK_ARN = `arn:aws:cloudformation:${REGION}:${ACCOUNT}:stack/${STACK_NAME}/${STACK_ID}`

const events = [{
    StackId: STACK_ARN,
    EventId: 'd797a8c0-8d66-11e6-8349-50a686fc37d2',
    ResourceStatus: 'UPDATE_COMPLETE',
    ResourceType: 'AWS::CloudFormation::Stack',
    Timestamp: '2016-10-08T14:52:32.419Z',
    StackName: STACK_NAME,
    PhysicalResourceId: STACK_ARN,
    LogicalResourceId: STACK_NAME
  },{
    StackId: STACK_ARN,
    EventId: 'User-CREATE_COMPLETE-2016-10-08T14:52:25.702Z',
    ResourceStatus: 'CREATE_IN_PROGRESS',
    ResourceType: 'AWS::IAM::User',
    Timestamp: '2016-10-08T14:52:25.702Z',
    StackName: STACK_NAME,
    ResourceProperties: {
      Policies:[{
        PolicyName:'s3policy',
        PolicyDocument:{
          Statement:[{
            Action:'s3:PutObject',
            Resource:['arn:aws:s3:::abucket/*'],
            Effect:'Allow'
          }]
        }
      }]
    },
    PhysicalResourceId: `${STACK_NAME}-User-MZJVNUC3D387`,
    LogicalResourceId: 'User'
}];

module.exports = function(name) {
  var callback = this.async();
  emit('cf-events-found', {
    events: events,
    status: events[0].ResourceStatus
  });
  callback();
};
