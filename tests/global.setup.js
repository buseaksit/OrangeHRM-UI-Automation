import '../utils/load_env.js'
import{ test as setup } from '@playwright/test'
import { refreshStorageState } from '../utils/storageStateUtil'

setup( 'login once and save storage', async()=>{
    await refreshStorageState();
    
});