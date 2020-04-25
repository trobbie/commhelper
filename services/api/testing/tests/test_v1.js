import chai  from 'chai';
import chaiHttp from 'chai-http';
import AWS from 'aws-sdk-mock';
import app from '../../app.js';
import sinon from 'sinon';

import activitiesController from '../../controllers/activities';


chai.use(chaiHttp);
chai.should(); // use should interface

// const api_url = 'http://localhost:3000/api/v1';

let sandbox;

describe("Activities", () => {

    xdescribe("GET /api/v1/activities", () => {
        it("should get all activities", (done) => {

        const docClient = new AWS.DynamoDB.DocumentClient();
            chai.request(app)
                .get('/api/v1/activities')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array').to.not.be.empty;
                    done();
                });
        })
    })

    xdescribe("GET /api/v1/activities/1", () => {
        let res;
        beforeEach((done) => {
            // sandbox = sinon.sandbox.create(); // createSandbox();
            res = {
                json: sinon.spy(),
                status: sinon.spy().returnValues( { end: sinon.spy()})
            };
            done();
        });

        afterEach((done) => {
            // sandbox.restore();
            // AWS.restore();
            done();
        });

        it("should get specific activity (array format)", (done) => {
            // AWS.mock('DynamoDB', 'query', 
            //     (params, callback) => {
            //         console.log('TESTING MOCK WORKED');
            //         callback(null, {Item: {
            //             id: 1,
            //             name: 'TestActivity1',
            //             dateCreated: new Date()
            //           }})
            //     }
            // );
            // const result = { Item: { id: '2', name: 'Go to gym'}};
            // sandbox.stub(dbService.docClient, 'query')
            //     .returns(promise: {Item: {Key: 'Value'}});

            var req = { params: { 'id': '1'}};
            
            activitiesController.getActivity(req, res);
            console.log(resp.body);
            // chai.request(app)
            //     .get('/api/v1/activities/1')
                // .end((err, res) => {
                //     res.should.have.status(200);
                //     res.should.be.json;
                //     res.body.should.be.a('array');; 
                //     res.body.should.have.length(1); 
                //     res.body[0].should.have.property('id'); 
                //     res.body[0].should.have.property('name'); 
                //     res.body[0].should.have.property('dateCreated');
                //     res.body[0].id.should.equal(1);
                //     res.body[0].name.should.be.a('string');
                //     done();
                // });
        })
    })

});