
{selectedTab1 === 'tab2' && (
    <div className={`${styles.container} ${styles.gridTemplate2}`}>
    <div className={styles.gridrow} style={{ gridArea: 'nameAndId' }}>
      <div className={`${styles.section} ${styles.nameAndId}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Name and Emp ID :</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_name}</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_id}</div>
      </div>
    </div>


  <div className={styles.gridrow} style={{ gridArea: 'formLink' }}>
    <div className={`${styles.section} ${styles.formLink}`}>
      <div className={styles.content}>
        <ShareMultiple24Filled style={{color:'rgb(1,105,185)'}}/>
        <Link style={{ marginLeft: '10px' }} onClick={() => handleShareLinkClick(selectedEmployee.employee_id)}>
          Share Form Link
        </Link>
  {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied to clipboard!</span>}
      </div>
    </div>
  </div>

    <div className={styles.gridrow} style={{ gridArea: 'email' }}>
      <div className={`${styles.section} ${styles.email}`}>
        <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Email:</div>
        <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.employee_mail}</div>
      </div>
    </div>

  <div className={styles.gridrow} style={{ gridArea: 'doj' }}>
  <div className={`${styles.section} ${styles.doj}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Joining:</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.date_of_joining}</div>
      {/* <div style={{marginLeft:"10px",color:themestate?"white":""}}>{selectedEmployee.doj}</div> */}
  </div>
  </div>
 
  <div className={styles.gridrow} style={{ gridArea: 'status' }}>
  <div className={`${styles.section} ${styles.status}`}>
    <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Current Status:</div>
    <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.status}</div>
  </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'dos' }}>
  <div className={`${styles.section} ${styles.dos}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Date of Starting:</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.date_of_reporting}</div>
  </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'role' }}>
  <div className={`${styles.section} ${styles.role}`}>
    <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Role:</div>
    <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.designation}</div>
  </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'appraisal' }}>
  <div className={`${styles.section} ${styles.appraisal}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Appraisal Date:</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.appraisal_date}</div>
  </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'dept' }}>
    <div className={`${styles.section} ${styles.dept}`}>
      <div className={styles.heading} style={{ fontWeight: 'bold', color:themestate?"white":""}}>Department:</div>
      <div className={styles.content} style={{color:themestate?"rgb(245,245,245)":""}}>{selectedEmployee.department.dept_name}</div>
    </div>
  </div>


  <div className={styles.gridrow} style={{ gridArea: 'reviewer' }}>
    <div className={`${styles.section} ${styles.reviewer}`}>
      <div className={styles.content}>
        <Add24Filled style={{color:'rgb(1,105,185)'}}/>
        <Link className={styles.reviewerLink}>Add Reviewer</Link>
      </div>
    </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'editDetails' }}>
  <div className={`${styles.section} ${styles.editDetails}`}>
    <div className={styles.content}>
      <EditRegular className={styles.editIcon} />
      <span>Edit Details</span>
    </div>
  </div>
  </div>

  <div className={styles.gridrow} style={{ gridArea: 'share' }}>
    <div className={`${styles.section} ${styles.share}`}>
      <div className={styles.content}>
        <ShareIos24Filled style={{color:'rgb(1,105,185)'}}/>
        <Link className={styles.shareLink}>Share to {selectedEmployee.reporting_manager}</Link>
      </div>
    </div>
  </div>
</div>
    )}
    