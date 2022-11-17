import { PreviousJobsModel } from "src/common/models/previousJobs.model";
import { differenceInYears, closestTo, isEqual } from 'date-fns';

export const getLastJobFactory = (previousJobs: PreviousJobsModel[]) => {
    const today = new Date();
    if(!previousJobs || !previousJobs?.length) return {
        profession: '-',
        experienceTime: 0
    }
    
    // current job
    const prevJob = previousJobs?.find((job) => {
        return job?.toDate === null || !job.toDate
    });
    if(prevJob) {
        const experienceTime = differenceInYears(today, prevJob.fromDate)
        return {
            profession: prevJob?.role,
            experienceTime: experienceTime <= 0 ? 0 : experienceTime
        }
    }

    //last job
    const dateArray = previousJobs?.map((j) => new Date(j.toDate));
    const closestDate = closestTo(today, dateArray);
    const lastJob = previousJobs?.find((job) => {
        const isTheSameDate = isEqual(job.toDate, closestDate);
        return isTheSameDate ?? job
    });
    const experienceTime = differenceInYears(lastJob.toDate, lastJob.fromDate);
    console.log(experienceTime)
    

    return {
        profession: lastJob?.role,
        experienceTime: experienceTime <= 0 ? 0 : experienceTime
    }

}