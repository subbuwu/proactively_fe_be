import '../styles/nav.scss'

const Navbar = () => {
  return (
    <nav>
        <div className='nav_container'>
            <div className='logo_container'>
                <img src='/logo.svg' className='logo'/>
                <h1 className='title'>
                    ProVital
                </h1>
            </div>

            <div className='ul_container'>
                <ul>
                    <li>List your practice</li>
                    <hr/>
                    <li>For Employees</li>
                    <hr/>
                    <li>Courses</li>
                    <hr/>
                    <li>Books</li>
                    <hr/>
                    <li>Speaker</li>
                    <hr/>
                    <li>Doctor</li>
                    <hr/>
                    <li>Login / Signup</li>
                </ul>
            </div>
            
        </div>

        <div className='blur'>
        </div>
    </nav>
  )
}

export default Navbar