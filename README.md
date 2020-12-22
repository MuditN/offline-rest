#Config


GraphQL endpoint: https://jyifycun6bf4bjkh6dzmomiz2m.appsync-api.us-west-2.amazonaws.com/graphql
GraphQL API KEY: da2-5z55rnm3gbam7kikvq6wjsie4a


Backup Reference 
    Request
    {
  "version": "2018-05-29",
  "operation": "Sync",
  "limit": $util.defaultIfNull($ctx.args.limit, 100),
  "nextToken": $util.toJson($util.defaultIfNull($ctx.args.nextToken, null)),
  "lastSync": $util.toJson($util.defaultIfNull($ctx.args.lastSync, null)),
  "filter":   #if( $context.args.filter )
$util.transform.toDynamoDBFilterExpression($ctx.args.filter)
  #else
null
  #end
}

    Response
    #if( $ctx.error )
$util.error($ctx.error.message, $ctx.error.type, $ctx.result)
#else
$util.toJson($ctx.result)
#end