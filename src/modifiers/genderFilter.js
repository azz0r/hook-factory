export const genderFilter = gender => ({  
    posthook: data => data.filter(item => item.male === Boolean(gender))
});

export default genderFilter