const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const checkArr = [
    "country",
    "state",
    "city",
    "companyName",
    "companyType",
    "companyAddress",
];
  
// GET ALL COMPANY INFO
exports.getAllCompanyInfo = catchAsync(async (req, res, next) => {
    const user = req.user;
    const companyInfo = user.companyInformation;
    res.status(200).json({
        data: {
            message: "COMPANY INFO",
            doc: companyInfo,
        },
    });
});

// ADD COMPANY INFO
exports.addCompanyInfo = catchAsync(async (req, res, next) => {
    const user = req.user;
    const companyInfo = {};
    
    if (!user.role === "agent") return next(new AppErr("Unauthorized, Please Login Using Agent", 403));
    for (const [key, value] of Object.entries(req.body)) {
        if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
        companyInfo[key]=value;
         }
         console.log(companyInfo);
         //user.companyInformation.push(companyInfo);
          //user.companyInformation.push(companyInfo);
         user.companyInformation = companyInfo;
         await user.save();
    res.status(200).json({
        data: {
            message: "Company Info Successfully Added",
             doc: user.companyInformation,
            }
    });
});

// UPDATE COMPANY INFO
exports.updateCompanyInfo = catchAsync(async (req, res, next) => {
    const user = req.user;
    const  companyInfoSubDoc={};
    //const { companyInfoDocId } = req.body;
    //if (!companyInfoDocId) return next(new AppErr("Please Provide Sub Document ID", 400));
    //const companyInfoSubDoc = user.companyInfo.id(companyInfoDocId);
    // loop through req.body
    for (const [key, value] of Object.entries(req.body)) {
        // if docid then dont go through further steps
        //if (key === "companyInfoDocId") continue;
        // check if field available in checkArr, if not return error
        if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
        // update subdocument
        companyInfoSubDoc[key] = value;
    }
    user.companyInformation = companyInfoSubDoc;
    await user.save();
    res.status(200).json({
        data: {
            message: "Company Info Successfully Updated",
            doc: companyInfoSubDoc,
        },
    });
});

// DELETE COMPANY INFO
exports.deleteCompanyInfo = catchAsync(async (req, res, next) => {
    const user = req.user;
    user.companyInformation = {};
    await user.save();
    res.status(200).json({
        data: {
            message: "Company Info Successfully Deleted",
            doc: user.companyInformation,
        },
    });
});