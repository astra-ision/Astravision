import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchEmployees = createAsyncThunk(
  'hrms/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/hrms?action=employees');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch employees');
    }
  }
);

export const fetchDepartments = createAsyncThunk(
  'hrms/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/hrms?action=departments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch departments');
    }
  }
);

export const addEmployee = createAsyncThunk(
  'hrms/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/hrms', {
        action: 'add-employee',
        data: employeeData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'hrms/updateEmployee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/hrms', {
        action: 'update-employee',
        id,
        data
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update employee');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'hrms/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/hrms', {
        action: 'delete-employee',
        id
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete employee');
    }
  }
);

export const fetchAttendance = createAsyncThunk(
  'hrms/fetchAttendance',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/hrms?action=attendance&employeeId=${employeeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance');
    }
  }
);

export const fetchPayroll = createAsyncThunk(
  'hrms/fetchPayroll',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/hrms?action=payroll&employeeId=${employeeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payroll');
    }
  }
);

export const generatePayslip = createAsyncThunk(
  'hrms/generatePayslip',
  async ({ employeeId, month, year }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/hrms', {
        action: 'generate-payslip',
        employeeId,
        month,
        year
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate payslip');
    }
  }
);

const initialState = {
  employees: [],
  departments: [],
  currentEmployee: null,
  attendance: [],
  payroll: [],
  currentPayslip: null,
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    department: 'All',
    status: 'All',
  },
  sortConfig: {
    key: 'name',
    direction: 'ascending',
  },
};

const hrmsSlice = createSlice({
  name: 'hrms',
  initialState,
  reducers: {
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        searchTerm: '',
        department: 'All',
        status: 'All',
      };
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetch departments
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle add employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle update employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex((employee) => employee.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        if (state.currentEmployee?.id === action.payload.id) {
          state.currentEmployee = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
        if (state.currentEmployee?.id === action.payload) {
          state.currentEmployee = null;
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetch attendance
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetch payroll
      .addCase(fetchPayroll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayroll.fulfilled, (state, action) => {
        state.loading = false;
        state.payroll = action.payload;
      })
      .addCase(fetchPayroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle generate payslip
      .addCase(generatePayslip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePayslip.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayslip = action.payload;
      })
      .addCase(generatePayslip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentEmployee,
  clearCurrentEmployee,
  setFilters,
  clearFilters,
  setSortConfig,
  clearError,
} = hrmsSlice.actions;

export default hrmsSlice.reducer; 