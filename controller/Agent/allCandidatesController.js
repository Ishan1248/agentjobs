const path = require("path");
const catchAsync = require(path.join(__dirname, "..","..", "utils", "catchAsync"));
//const catchAsyncErrors = require(path.join(__dirname,"..","..","common_middleware","catchAsyncError"));
//const apiFeatures = require(path.join(__dirname,"..","..","utils","apiFeatures"));
const candidates=require(path.join(__dirname,"..","..","model","CandidateSchema"));
const agentschema=require(path.join(__dirname,"..","..","model","AgentSchema"));
const jobpost=require(path.join(__dirname,"..","..","model","JobPostSchema"));
const AppErr=require(path.join(__dirname,"..","..","utils","AppErr"));

//ADD CANDIDATE
exports.addCandidate = catchAsync(async (req, res, next) => {
    const user=req.user;
    if(user.role==="Agent" || user.role==="agent"){
        const agent=await agentschema.findById(user._id);
        const candidate=await candidates.create(req.body);
        agent.candidates.push(candidate._id);
        await agent.save();
        res.status(200).json({
            success: true,
            message:"Candidate Added Successfully",
            candidate,
        });
    }
    else{
        return next(new AppErr("Unauthorized, Please Login as Agent", 403));
    }
});





//GET REGISTERED CANDIDATES
exports.getRegisteredCandidates = catchAsync(async (req, res, next) => {
    //const agentId=req.user._id;
    const user=req.user;
    if(user.role==="Agent" || user.role==="agent"){
        const agent=await agentschema.findById(user._id);
        const resultPerPage=8;
        const apiFeatures=new ApiFeatures(candidates.find({agentId:agent._id}),req.query).pagination(resultPerPage);
        const registeredcandidates=await apiFeatures.query;
    }
        res.status(200).json({
            success: true,
            registeredcandidates,
        });
    });
//     registeredAgentCandidates = await candidates.find({agentId:req.user._id});
//     const resultPerPage=8;
//     //const registeredCandidates=agentschema.registeredCandidates;
//     const apiFeatures=new ApiFeatures(registeredAgentCandidates.find(),req.query).pagination(resultPerPage);
//     const allRegisteredCandidates=await apiFeatures.query;
//     res.status(200).json({
//         success: true,
//         message: "All Registered Candidates of Agent",
//         allRegisteredCandidates,
//     });
// }); 

